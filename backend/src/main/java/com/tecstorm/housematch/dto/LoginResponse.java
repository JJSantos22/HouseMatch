package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

public record LoginResponse(@JsonProperty("user_id") UUID userId) {}
