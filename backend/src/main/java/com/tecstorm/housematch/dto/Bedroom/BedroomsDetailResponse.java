package com.tecstorm.housematch.dto.Bedroom;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.dto.Property.PropertyResponse;

public record BedroomsDetailResponse(
    @JsonProperty("bedrooms") List<BedroomResponse> bedrooms,
    @JsonProperty("property") PropertyResponse property
) {}
