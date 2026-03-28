package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BedroomDetailResponse(
    @JsonProperty("bedroom") BedroomResponse bedroom,
    @JsonProperty("property") PropertyResponse property
) {}
