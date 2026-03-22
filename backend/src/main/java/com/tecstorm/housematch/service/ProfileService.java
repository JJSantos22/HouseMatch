package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.ProfileResponse;
import com.tecstorm.housematch.dto.CreateProfileRequest;
import com.tecstorm.housematch.entities.*;
import com.tecstorm.housematch.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final StudentRepository studentRepository;
    private final LandlordRepository landlordRepository;

    public ProfileService(ProfileRepository profileRepository, StudentRepository studentRepository, LandlordRepository landlordRepository) {
        this.profileRepository = profileRepository;
        this.studentRepository = studentRepository;
        this.landlordRepository = landlordRepository;
    }

    public ProfileResponse getProfile(UUID userId) {
        ProfileEntity profile = profileRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (profile.getRole() == UserRole.student) {
            StudentEntity student = studentRepository.findByProfileId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), student.getUniversity(), null, profile.getEmail());
        } else {
            LandlordEntity landlord = landlordRepository.findByProfileId(userId)
                .orElseThrow(() -> new RuntimeException("Landlord not found"));
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), null, landlord.getPhone(), profile.getEmail());
        }
    }

    @Transactional
    public ProfileResponse createProfile(CreateProfileRequest request) {
        ProfileEntity profile = profileRepository.findById(request.userId())
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (request.role() == UserRole.student) {
            studentRepository.save(new StudentEntity(profile, request.university()));
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), request.university(), null, profile.getEmail());
        } else {
            landlordRepository.save(new LandlordEntity(profile, request.phone()));
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), null, request.phone(), profile.getEmail());
        }
    }
}
