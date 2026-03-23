package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.entities.PersonalityLevel;

public record UpdateProfileRequest(
    @JsonProperty("name") String name,
    @JsonProperty("university") String university,
    @JsonProperty("phone") String phone,
    @JsonProperty("schedule") PersonalityLevel schedule,
    @JsonProperty("social") PersonalityLevel social,
    @JsonProperty("cleanliness") PersonalityLevel cleanliness,
    @JsonProperty("academic") PersonalityLevel academic,
    @JsonProperty("lifestyle") PersonalityLevel lifestyle,
    @JsonProperty("priority") PersonalityLevel priority
) {}
