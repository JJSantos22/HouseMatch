package com.tecstorm.housematch.auth.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record LoginRequest(
    @JsonProperty("email") String email,
    @JsonProperty("password") String password
) {}
