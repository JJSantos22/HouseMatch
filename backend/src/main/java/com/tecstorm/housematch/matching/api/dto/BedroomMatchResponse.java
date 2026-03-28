package com.tecstorm.housematch.matching.api.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.property.api.dto.BedroomResponse;
import com.tecstorm.housematch.property.api.dto.PropertyResponse;

public record BedroomMatchResponse(
    @JsonProperty("bedroom") BedroomResponse bedroom,
    @JsonProperty("property") PropertyResponse property,
    @JsonProperty("score") Integer score,
    @JsonProperty("breakdown") List<TraitMatchBreakdownResponse> breakdown
) {}
