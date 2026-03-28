package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record BedroomMatchesResponse(
    @JsonProperty("matches") List<BedroomMatchResponse> matches
) {}
