package com.tecstorm.housematch.auth.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

public record LoginResponse(@JsonProperty("user_id") UUID userId) {}
