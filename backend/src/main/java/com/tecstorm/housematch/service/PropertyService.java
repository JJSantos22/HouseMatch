package com.tecstorm.housematch.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.tecstorm.housematch.dto.Bedroom.BedroomMapResponse;
import com.tecstorm.housematch.dto.Property.PropertyMapResponse;
import com.tecstorm.housematch.dto.Property.PropertyResponse;
import com.tecstorm.housematch.entities.Property.PropertyEntity;
import com.tecstorm.housematch.repository.PropertyRepository;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public PropertyResponse getById(UUID id) {
        PropertyEntity p = propertyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        return new PropertyResponse(p.getId(), p.getTitle(), p.getAddress(), p.getLat(), p.getLng(), p.getTotalPeople(), p.getTotalBedrooms(), p.getTotalBathrooms(), p.getLaundry(), p.getDishwasher(), p.getParking(), p.getAc(), p.getWifi(), p.getSizeSqft(), p.getPhotos());
    }

    public List<PropertyMapResponse> getPropertiesForMap() {
        return propertyRepository.findAll().stream()
            .map(p -> new PropertyMapResponse(
                p.getId(),
                p.getLat(),
                p.getLng(),
                p.getBedrooms().stream()
                    .map(b -> new BedroomMapResponse(b.getId(), b.getTitle(), b.getPrice()))
                    .toList()
            ))
            .toList();
    }
}
