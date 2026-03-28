package com.tecstorm.housematch.dto.Bedroom;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.dto.Property.PropertyResponse;

public record BedroomDetailResponse(
    @JsonProperty("bedroom") BedroomResponse bedroom,
    @JsonProperty("property") PropertyResponse property
) {}
