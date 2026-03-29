package com.tecstorm.housematch.auth.application;

import com.tecstorm.housematch.auth.api.dto.LoginRequest;
import com.tecstorm.housematch.auth.api.dto.LoginResponse;
import com.tecstorm.housematch.auth.api.dto.RegisterRequest;
import com.tecstorm.housematch.auth.api.dto.RegisterResponse;
import com.tecstorm.housematch.profile.domain.LandlordEntity;
import com.tecstorm.housematch.profile.domain.ProfileEntity;
import com.tecstorm.housematch.profile.domain.StudentEntity;
import com.tecstorm.housematch.profile.domain.UserRole;
import com.tecstorm.housematch.profile.infrastructure.LandlordRepository;
import com.tecstorm.housematch.profile.infrastructure.ProfileRepository;
import com.tecstorm.housematch.profile.infrastructure.StudentRepository;
import com.tecstorm.housematch.searchpreference.domain.SearchPreferenceEntity;
import com.tecstorm.housematch.searchpreference.infrastructure.SearchPreferenceRepository;
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
            String university = request.university();
            StudentEntity student = studentRepository.save(new StudentEntity(saved, university));
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
