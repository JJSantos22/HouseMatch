package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.entities.Personality.PersonalityLevel;

public record UpdatePropertyTraitsRequest(
    @JsonProperty("schedule") PersonalityLevel schedule,
    @JsonProperty("social") PersonalityLevel social,
    @JsonProperty("noise") PersonalityLevel noise,
    @JsonProperty("academic") PersonalityLevel academic,
    @JsonProperty("cleanliness") PersonalityLevel cleanliness,
    @JsonProperty("guest_frequency") PersonalityLevel guestFrequency
) {}
