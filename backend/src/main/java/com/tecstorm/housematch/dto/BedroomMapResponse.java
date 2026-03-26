package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

public record BedroomMapResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("price") Integer price
) {}
