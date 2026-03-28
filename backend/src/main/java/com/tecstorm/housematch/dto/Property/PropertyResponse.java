package com.tecstorm.housematch.dto.Property;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tecstorm.housematch.entities.Laundry;

public record PropertyResponse(
    @JsonProperty("id") UUID id,
    @JsonProperty("title") String title,
    @JsonProperty("address") String address,
    @JsonProperty("lat") Double lat,
    @JsonProperty("lng") Double lng,
    @JsonProperty("total_people") Integer totalPeople,
    @JsonProperty("total_bedrooms") Integer totalBedrooms,
    @JsonProperty("total_bathrooms") Integer totalBathrooms,
    @JsonProperty("laundry") Laundry laundry,
    @JsonProperty("dishwasher") Boolean dishwasher,
    @JsonProperty("parking") Boolean parking,
    @JsonProperty("ac") Boolean ac,
    @JsonProperty("wifi") Boolean wifi,
    @JsonProperty("size_sqft") Integer sizeSqft,
    @JsonProperty("photos") String[] photos
) {}
