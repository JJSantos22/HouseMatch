package com.tecstorm.housematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.util.UUID;

public record BedroomResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("title") String title,
    @JsonProperty("total_people") Integer totalPeople,
    @JsonProperty("total_beds") Integer totalBeds,
    @JsonProperty("price") Integer price,
    @JsonProperty("size_sqft") Integer sizeSqft,
    @JsonProperty("furnished") Boolean furnished,
    @JsonProperty("private_bath") Boolean privateBath,
    @JsonProperty("available_from_date") LocalDate availableFromDate,
    @JsonProperty("available_to_date") LocalDate availableToDate,
    @JsonProperty("min_stay_months") Integer minStayMonths,
    @JsonProperty("photos") String[] photos,
    @JsonProperty("is_active") Boolean isActive
) {}
