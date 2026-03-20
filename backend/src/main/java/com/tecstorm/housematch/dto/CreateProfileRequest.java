package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.entities.UserRole;
import java.util.UUID;

public record CreateProfileRequest(
    @JsonProperty("user_id") UUID userId,
    @JsonProperty("name") String name,
    @JsonProperty("role") UserRole role,
    @JsonProperty("university") String university,
    @JsonProperty("phone") String phone,
    @JsonProperty("email") String email
) {}
