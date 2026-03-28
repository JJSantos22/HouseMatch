package com.tecstorm.housematch.searchpreference.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.property.domain.Laundry;
import java.time.LocalDate;

public record UpdateSearchPreferenceRequest(
    @JsonProperty("min_price") Integer minPrice,
    @JsonProperty("max_price") Integer maxPrice,
    @JsonProperty("min_stay_months") Integer minStayMonths,
    @JsonProperty("available_from") LocalDate availableFrom,
    @JsonProperty("furnished") Boolean furnished,
    @JsonProperty("private_bath") Boolean privateBath,
    @JsonProperty("private_room") Boolean privateRoom,
    @JsonProperty("max_roommates") Integer maxRoommates,
    @JsonProperty("max_bedrooms") Integer maxBedrooms,
    @JsonProperty("dishwasher") Boolean dishwasher,
    @JsonProperty("parking") Boolean parking,
    @JsonProperty("ac") Boolean ac,
    @JsonProperty("wifi") Boolean wifi,
    @JsonProperty("laundry") Laundry laundry,
    @JsonProperty("center_lat") Double centerLat,
    @JsonProperty("center_lng") Double centerLng,
    @JsonProperty("radius_km") Integer radiusKm
) {}
