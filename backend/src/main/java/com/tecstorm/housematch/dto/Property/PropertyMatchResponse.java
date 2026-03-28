package com.tecstorm.housematch.dto.Property;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PropertyMatchResponse(
    @JsonProperty("property") PropertyResponse property,
    @JsonProperty("score") Integer score,
    @JsonProperty("reasoning") List<PropertyMatchReasonResponse> reasoning
) {}
