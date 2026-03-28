package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TraitMatchBreakdownResponse(
    @JsonProperty("trait") String trait,
    @JsonProperty("student_value") String studentValue,
    @JsonProperty("bedroom_value") String bedroomValue,
    @JsonProperty("weight") Integer weight,
    @JsonProperty("points") Integer points,
    @JsonProperty("score") Integer score
) {}
