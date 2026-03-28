package com.tecstorm.housematch.profile.application;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tecstorm.housematch.matching.domain.EmbeddingService;
import com.tecstorm.housematch.personality.application.PersonalityTraitService;
import com.tecstorm.housematch.profile.api.dto.ProfileResponse;
import com.tecstorm.housematch.profile.api.dto.UpdateProfileRequest;
import com.tecstorm.housematch.profile.domain.ProfileEntity;
import com.tecstorm.housematch.profile.domain.UserRole;
import com.tecstorm.housematch.profile.infrastructure.ProfileRepository;
import com.tecstorm.housematch.review.application.ReviewService;

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
