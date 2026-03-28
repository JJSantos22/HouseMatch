package com.tecstorm.housematch.controller;

import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.dto.UpdateSearchPreferenceRequest;
import com.tecstorm.housematch.dto.ProfileResponse;
import com.tecstorm.housematch.service.ProfileService;
import com.tecstorm.housematch.service.SearchPreferenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

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

    @PutMapping("/search-preferences")
    public ResponseEntity<Void> updateSearchPreferences(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody UpdateSearchPreferenceRequest request) {
        searchPreferenceService.update(userId, request);
        return ResponseEntity.noContent().build();
    }
}
