package com.tecstorm.housematch.controller;

import com.tecstorm.housematch.dto.BedroomDetailResponse;
import com.tecstorm.housematch.dto.PropertyMapResponse;
import com.tecstorm.housematch.dto.PropertyResponse;
import com.tecstorm.housematch.service.BedroomService;
import com.tecstorm.housematch.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/property")
public class PropertyController {

    private final PropertyService propertyService;
    private final BedroomService bedroomService;

    public PropertyController(PropertyService propertyService, BedroomService bedroomService) {
        this.propertyService = propertyService;
        this.bedroomService = bedroomService;
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
}
