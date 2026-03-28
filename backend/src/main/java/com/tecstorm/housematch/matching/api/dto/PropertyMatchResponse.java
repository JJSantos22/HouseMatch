package com.tecstorm.housematch.matching.api.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.property.api.dto.PropertyResponse;

public record PropertyMatchResponse(
    @JsonProperty("property") PropertyResponse property,
    @JsonProperty("score") Integer score,
    @JsonProperty("reasoning") List<PropertyMatchReasonResponse> reasoning
) {}
