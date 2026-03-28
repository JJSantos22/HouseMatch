package com.tecstorm.housematch.property.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.property.api.dto.PropertyResponse;

public record BedroomDetailResponse(
    @JsonProperty("bedroom") BedroomResponse bedroom,
    @JsonProperty("property") PropertyResponse property
) {}
