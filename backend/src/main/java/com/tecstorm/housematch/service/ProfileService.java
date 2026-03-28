package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.dto.ProfileResponse;
import com.tecstorm.housematch.entities.*;
import com.tecstorm.housematch.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final StudentService studentService;
    private final LandlordService landlordService;
    private final PersonalityTraitService personalityTraitService;
    private final ReviewService reviewService;

    public ProfileService(ProfileRepository profileRepository, StudentService studentService, LandlordService landlordService, PersonalityTraitService personalityTraitService, ReviewService reviewService) {
        this.profileRepository = profileRepository;
        this.studentService = studentService;
        this.landlordService = landlordService;
        this.personalityTraitService = personalityTraitService;
        this.reviewService = reviewService;
    }

    public ProfileResponse getProfile(UUID userId) {
        ProfileEntity profile = profileRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (profile.getRole() == UserRole.student) {
            var studentEntity = studentService.get(userId);
            var traits = personalityTraitService.get(studentEntity.getId());
            var reviews = reviewService.getByStudentId(studentEntity.getId());
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), studentEntity.getUniversity(), null, profile.getEmail(), traits, reviews);
        } else {
            var landlordEntity = landlordService.get(userId);
            return new ProfileResponse(profile.getId(), profile.getName(), profile.getRole(), null, landlordEntity.getPhone(), profile.getEmail(), null, null);
        }
    }

    @Transactional
    public void updateProfile(UUID userId, UpdateProfileRequest request) {
        ProfileEntity profile = profileRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setName(request.name());
        profileRepository.save(profile);

        if (profile.getRole() == UserRole.student) {
            var student = studentService.get(userId);
            studentService.update(userId, request);
            personalityTraitService.update(student.getId(), request);
        } else {
            landlordService.update(userId, request);
        }
    }
}
