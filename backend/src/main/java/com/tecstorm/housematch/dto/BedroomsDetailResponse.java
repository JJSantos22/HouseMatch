package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record BedroomsDetailResponse(
    @JsonProperty("bedrooms") List<BedroomResponse> bedrooms,
    @JsonProperty("property") PropertyResponse property
) {}
