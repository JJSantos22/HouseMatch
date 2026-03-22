package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateProfileRequest(
    @JsonProperty("name") String name,
    @JsonProperty("university") String university,
    @JsonProperty("phone") String phone
) {}
