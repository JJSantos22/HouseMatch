package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.UUID;

public record PropertyMapResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("lat") Double lat,
    @JsonProperty("lng") Double lng,
    @JsonProperty("bedrooms") List<BedroomMapResponse> bedrooms
) {}
