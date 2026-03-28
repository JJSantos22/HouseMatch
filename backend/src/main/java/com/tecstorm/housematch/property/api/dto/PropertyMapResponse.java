package com.tecstorm.housematch.property.api.dto;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.property.api.dto.BedroomMapResponse;

public record PropertyMapResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("lat") Double lat,
    @JsonProperty("lng") Double lng,
    @JsonProperty("bedrooms") List<BedroomMapResponse> bedrooms
) {}
