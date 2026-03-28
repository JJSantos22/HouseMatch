package com.tecstorm.housematch.property.api.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.property.api.dto.PropertyResponse;

public record BedroomsDetailResponse(
    @JsonProperty("bedrooms") List<BedroomResponse> bedrooms,
    @JsonProperty("property") PropertyResponse property
) {}
