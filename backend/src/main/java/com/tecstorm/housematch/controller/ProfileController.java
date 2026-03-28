package com.tecstorm.housematch.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecstorm.housematch.dto.ProfileResponse;
import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.dto.UpdateSearchPreferenceRequest;
import com.tecstorm.housematch.service.ProfileService;
import com.tecstorm.housematch.service.SearchPreferenceService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final SearchPreferenceService searchPreferenceService;

    public ProfileController(ProfileService profileService, SearchPreferenceService searchPreferenceService) {
        this.profileService = profileService;
        this.searchPreferenceService = searchPreferenceService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(profileService.getProfile(userId));
    }

    @PutMapping
    public ResponseEntity<Void> updateProfile(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody UpdateProfileRequest request) {
        profileService.updateProfile(userId, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{userId}/embedding/rebuild")
    public ResponseEntity<Void> rebuildEmbedding(@PathVariable UUID userId) {
        profileService.rebuildEmbedding(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/search-preferences")
    public ResponseEntity<Void> updateSearchPreferences(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody UpdateSearchPreferenceRequest request) {
        searchPreferenceService.update(userId, request);
        return ResponseEntity.noContent().build();
    }
}
