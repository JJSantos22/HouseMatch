package com.tecstorm.housematch.review.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;
import java.util.UUID;

public record ReviewResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("student_id") UUID studentId,
    @JsonProperty("rating") Double rating,
    @JsonProperty("comment") String comment,
    @JsonProperty("created_at") OffsetDateTime createdAt
) {}
