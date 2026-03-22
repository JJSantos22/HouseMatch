package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.CreateProfileRequest;
import com.tecstorm.housematch.dto.ProfileResponse;
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
    public ProfileResponse updateProfile(UUID userId, CreateProfileRequest request) {
        ProfileEntity profile = profileRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setName(request.name());
        profileRepository.save(profile);

        if (profile.getRole() == UserRole.student) {
            StudentEntity student = studentRepository.findByProfileId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
            student.setUniversity(request.university());
            studentRepository.save(student);
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), student.getUniversity(), null, profile.getEmail());
        } else {
            LandlordEntity landlord = landlordRepository.findByProfileId(userId)
                .orElseThrow(() -> new RuntimeException("Landlord not found"));
            landlord.setPhone(request.phone());
            landlordRepository.save(landlord);
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), null, landlord.getPhone(), profile.getEmail());
        }
    }
}
