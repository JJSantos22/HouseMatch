package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.RegisterRequest;
import com.tecstorm.housematch.dto.RegisterResponse;
import com.tecstorm.housematch.entities.*;
import com.tecstorm.housematch.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final ProfileRepository profileRepository;
    private final StudentRepository studentRepository;
    private final LandlordRepository landlordRepository;

    public AuthService(ProfileRepository profileRepository, StudentRepository studentRepository, LandlordRepository landlordRepository) {
        this.profileRepository = profileRepository;
        this.studentRepository = studentRepository;
        this.landlordRepository = landlordRepository;
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
            studentRepository.save(new StudentEntity(saved, null));
        } else {
            landlordRepository.save(new LandlordEntity(saved, null));
        }

        return new RegisterResponse(saved.getId());
    }
}
