package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record BedroomMatchResponse(
    @JsonProperty("bedroom") BedroomResponse bedroom,
    @JsonProperty("property") PropertyResponse property,
    @JsonProperty("score") Integer score,
    @JsonProperty("breakdown") List<TraitMatchBreakdownResponse> breakdown
) {}
