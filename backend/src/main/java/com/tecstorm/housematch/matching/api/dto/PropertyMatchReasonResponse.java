package com.tecstorm.housematch.matching.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PropertyMatchReasonResponse(
    @JsonProperty("trait") String trait,
    @JsonProperty("student_value") String studentValue,
    @JsonProperty("property_value") String propertyValue,
    @JsonProperty("weight") Integer weight,
    @JsonProperty("points") Integer points,
    @JsonProperty("score") Integer score
) {}
