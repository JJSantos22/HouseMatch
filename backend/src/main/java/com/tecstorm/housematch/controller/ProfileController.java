package com.tecstorm.housematch.controller;

import com.tecstorm.housematch.dto.CreateProfileRequest;
import com.tecstorm.housematch.dto.ProfileResponse;
import com.tecstorm.housematch.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable UUID userId) {
        return ResponseEntity.ok(profileService.getProfile(userId));
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody CreateProfileRequest request) {
        return ResponseEntity.ok(profileService.updateProfile(userId, request));
    }
}
