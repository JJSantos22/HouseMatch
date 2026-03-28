package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.entities.UserRole;
import java.util.List;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProfileResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("name") String name,
    @JsonProperty("role") UserRole role,
    @JsonProperty("university") String university,
    @JsonProperty("phone") String phone,
    @JsonProperty("email") String email,
    @JsonProperty("personality_traits") PersonalityTraitsResponse personalityTraits,
    @JsonProperty("reviews") List<ReviewResponse> reviews
) {}
