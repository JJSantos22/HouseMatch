package com.tecstorm.housematch.personality.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.personality.domain.PersonalityLevel;

public record PersonalityTraitsResponse(
    @JsonProperty("schedule") PersonalityLevel schedule,
    @JsonProperty("social") PersonalityLevel social,
    @JsonProperty("noise") PersonalityLevel noise,
    @JsonProperty("academic") PersonalityLevel academic,
    @JsonProperty("cleanliness") PersonalityLevel cleanliness,
    @JsonProperty("guest_frequency") PersonalityLevel guest_frequency
) {}
