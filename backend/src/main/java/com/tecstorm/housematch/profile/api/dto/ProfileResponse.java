package com.tecstorm.housematch.profile.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.personality.api.dto.PersonalityTraitsResponse;
import com.tecstorm.housematch.profile.domain.UserRole;
import com.tecstorm.housematch.review.api.dto.ReviewResponse;

import java.util.List;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProfileResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("student_id") UUID studentId,
    @JsonProperty("name") String name,
    @JsonProperty("role") UserRole role,
    @JsonProperty("university") String university,
    @JsonProperty("phone") String phone,
    @JsonProperty("email") String email,
    @JsonProperty("personality_traits") PersonalityTraitsResponse personalityTraits,
    @JsonProperty("reviews") List<ReviewResponse> reviews
) {}
