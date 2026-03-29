package com.tecstorm.housematch.auth.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.profile.domain.UserRole;

public record RegisterRequest(
    @JsonProperty("email") String email,
    @JsonProperty("password") String password,
    @JsonProperty("role") UserRole role,
    @JsonProperty("university") String university
) {}
