package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.entities.UserRole;

public record RegisterRequest(
    @JsonProperty("email") String email,
    @JsonProperty("password") String password,
    @JsonProperty("role") UserRole role
) {}
