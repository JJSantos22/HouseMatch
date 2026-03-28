package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.*;
import com.tecstorm.housematch.entities.*;
import com.tecstorm.housematch.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final ProfileRepository profileRepository;
    private final StudentRepository studentRepository;
    private final LandlordRepository landlordRepository;
    private final SearchPreferenceRepository searchPreferenceRepository;

    public AuthService(ProfileRepository profileRepository, StudentRepository studentRepository, LandlordRepository landlordRepository, SearchPreferenceRepository searchPreferenceRepository) {
        this.profileRepository = profileRepository;
        this.studentRepository = studentRepository;
        this.landlordRepository = landlordRepository;
        this.searchPreferenceRepository = searchPreferenceRepository;
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        ProfileEntity profile = new ProfileEntity(
            request.email(),
            request.password(),
            request.role()
        );
        ProfileEntity saved = profileRepository.save(profile);

        if (request.role() == UserRole.student) {
            StudentEntity student = studentRepository.save(new StudentEntity(saved, null));
            searchPreferenceRepository.save(new SearchPreferenceEntity(student));
        } else {
            landlordRepository.save(new LandlordEntity(saved, null));
        }

        return new RegisterResponse(saved.getId());
    }

    public LoginResponse login(LoginRequest request) {
        return profileRepository.findByEmailAndPassword(request.email(), request.password())
            .map(profile -> new LoginResponse(profile.getId()))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }
}
