package com.tecstorm.housematch.property.api;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecstorm.housematch.property.api.dto.BedroomDetailResponse;
import com.tecstorm.housematch.matching.api.dto.BedroomMatchesResponse;
import com.tecstorm.housematch.property.api.dto.BedroomsDetailResponse;
import com.tecstorm.housematch.property.api.dto.PropertyMapResponse;
import com.tecstorm.housematch.matching.api.dto.PropertyMatchResponse;
import com.tecstorm.housematch.property.api.dto.PropertyResponse;
import com.tecstorm.housematch.personality.api.dto.PropertyTraitsResponse;
import com.tecstorm.housematch.review.api.dto.ReviewResponse;
import com.tecstorm.housematch.personality.api.dto.UpdatePropertyTraitsRequest;
import com.tecstorm.housematch.matching.application.BedroomMatchingService;
import com.tecstorm.housematch.property.application.BedroomService;
import com.tecstorm.housematch.property.application.PropertyService;
import com.tecstorm.housematch.personality.application.PropertyTraitService;
import com.tecstorm.housematch.review.application.ReviewService;

@RestController
@RequestMapping("/api/property")
public class PropertyController {

    private final PropertyService propertyService;
    private final BedroomService bedroomService;
    private final ReviewService reviewService;
    private final BedroomMatchingService bedroomMatchingService;
    private final PropertyTraitService propertyTraitService;

    public PropertyController(
        PropertyService propertyService,
        BedroomService bedroomService, ReviewService reviewService,
        BedroomMatchingService bedroomMatchingService,
        PropertyTraitService propertyTraitService
    ) {
        this.propertyService = propertyService;
        this.bedroomService = bedroomService;
        this.reviewService = reviewService;
        this.bedroomMatchingService = bedroomMatchingService;
        this.propertyTraitService = propertyTraitService;
    }

    @GetMapping("/map")
    public ResponseEntity<List<PropertyMapResponse>> getPropertiesForMap() {
        return ResponseEntity.ok(propertyService.getPropertiesForMap());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponse> getById(
            @PathVariable UUID id) {
        return ResponseEntity.ok(propertyService.getById(id));
    }

    @GetMapping("/{propertyId}/bedroom/{bedroomId}")
    public ResponseEntity<BedroomDetailResponse> getBedroomById(
            @PathVariable UUID propertyId,
            @PathVariable UUID bedroomId) {
        return ResponseEntity.ok(bedroomService.getById(propertyId, bedroomId));
    }

    @GetMapping("/{propertyId}/bedroom")
    public ResponseEntity<BedroomsDetailResponse> getBedroomsByPropertyId(
            @PathVariable UUID propertyId) {
        return ResponseEntity.ok(bedroomService.getByPropertyId(propertyId));
    }

    @GetMapping("/{propertyId}/review")
    public ResponseEntity<List<ReviewResponse>> getReviewsByPropertyId(
            @PathVariable UUID propertyId) {
        return ResponseEntity.ok(reviewService.getByPropertyId(propertyId));
    }

    @GetMapping("/matches")
    public ResponseEntity<BedroomMatchesResponse> getMatchesByStudent(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(bedroomMatchingService.getMatchesByProfileId(userId));
    }

    @GetMapping("/{propertyId}/match")
    public ResponseEntity<PropertyMatchResponse> getHouseMatch(
        @PathVariable UUID propertyId,
        @RequestHeader("X-User-Id") UUID userId
    ) {
        return ResponseEntity.ok(bedroomMatchingService.getPropertyMatch(propertyId, userId));
    }

    @GetMapping("/{propertyId}/traits")
    public ResponseEntity<PropertyTraitsResponse> getPropertyTraits(
        @PathVariable UUID propertyId
    ) {
        return ResponseEntity.ok(propertyTraitService.get(propertyId));
    }

    @PutMapping("/{propertyId}/traits")
    public ResponseEntity<Void> updatePropertyTraits(
        @PathVariable UUID propertyId,
        @RequestBody UpdatePropertyTraitsRequest request
    ) {
        propertyTraitService.update(propertyId, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{propertyId}/embedding/rebuild")
    public ResponseEntity<Void> rebuildPropertyEmbedding(@PathVariable UUID propertyId) {
        propertyTraitService.rebuildEmbedding(propertyId);
        return ResponseEntity.noContent().build();
    }
}
