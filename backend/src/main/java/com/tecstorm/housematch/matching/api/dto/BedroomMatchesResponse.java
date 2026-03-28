package com.tecstorm.housematch.matching.api.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BedroomMatchesResponse(
    @JsonProperty("matches") List<BedroomMatchResponse> matches
) {}
