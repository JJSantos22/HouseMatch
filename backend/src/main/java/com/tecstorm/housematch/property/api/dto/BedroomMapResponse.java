package com.tecstorm.housematch.property.api.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BedroomMapResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("title") String title,
    @JsonProperty("price") Integer price
) {}
