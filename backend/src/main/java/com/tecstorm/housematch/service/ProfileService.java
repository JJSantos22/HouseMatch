package com.tecstorm.housematch.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tecstorm.housematch.dto.ProfileResponse;
import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.entities.ProfileEntity;
import com.tecstorm.housematch.entities.UserRole;
import com.tecstorm.housematch.repository.ProfileRepository;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final StudentService studentService;
    private final LandlordService landlordService;
    private final PersonalityTraitService personalityTraitService;
    private final EmbeddingService embeddingService;
    private final ReviewService reviewService;

    public ProfileService(
        ProfileRepository profileRepository,
        StudentService studentService,
        LandlordService landlordService,
        PersonalityTraitService personalityTraitService,
        EmbeddingService embeddingService
    , ReviewService reviewService) {
        this.profileRepository = profileRepository;
        this.studentService = studentService;
        this.landlordService = landlordService;
        this.personalityTraitService = personalityTraitService;
        this.embeddingService = embeddingService;
        this.reviewService = reviewService;
    }

    public ProfileResponse getProfile(UUID userId) {
        ProfileEntity profile = profileRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (profile.getRole() == UserRole.student) {
            var studentEntity = studentService.get(userId);
            var traits = personalityTraitService.get(studentEntity.getId());
            var reviews = reviewService.getByStudentId(studentEntity.getId());
            return new ProfileResponse(profile.getId(), studentEntity.getId(), profile.getName(), profile.getRole(), studentEntity.getUniversity(), null, profile.getEmail(), traits, reviews);
        } else {
            var landlordEntity = landlordService.get(userId);
            return new ProfileResponse(profile.getId(), null, profile.getName(), profile.getRole(), null, landlordEntity.getPhone(), profile.getEmail(), null, null);
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
            profile.setEmbedding(embeddingService.forTraitMap(personalityTraitService.getTraitMapForStudent(student.getId())));
            profileRepository.save(profile);
        } else {
            landlordService.update(userId, request);
        }
    }

    @Transactional
    public void rebuildEmbedding(UUID userId) {
        ProfileEntity profile = profileRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (profile.getRole() != UserRole.student) {
            profile.setEmbedding(null);
            profileRepository.save(profile);
            return;
        }

        var student = studentService.get(userId);
        profile.setEmbedding(embeddingService.forTraitMap(personalityTraitService.getTraitMapForStudent(student.getId())));
        profileRepository.save(profile);
    }
}
