package com.tecstorm.housematch.dto.Bedroom;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.dto.Property.PropertyResponse;
import com.tecstorm.housematch.dto.TraitMatchBreakdownResponse;

public record BedroomMatchResponse(
    @JsonProperty("bedroom") BedroomResponse bedroom,
    @JsonProperty("property") PropertyResponse property,
    @JsonProperty("score") Integer score,
    @JsonProperty("breakdown") List<TraitMatchBreakdownResponse> breakdown
) {}
