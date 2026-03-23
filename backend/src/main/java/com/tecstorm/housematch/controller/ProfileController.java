package com.tecstorm.housematch.controller;

import com.tecstorm.housematch.dto.UpdateProfileRequest;
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
}
