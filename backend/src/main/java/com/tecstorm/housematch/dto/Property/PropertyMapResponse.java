package com.tecstorm.housematch.dto.Property;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.dto.Bedroom.BedroomMapResponse;

public record PropertyMapResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("lat") Double lat,
    @JsonProperty("lng") Double lng,
    @JsonProperty("bedrooms") List<BedroomMapResponse> bedrooms
) {}
