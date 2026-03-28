package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.BedroomDetailResponse;
import com.tecstorm.housematch.dto.BedroomResponse;
import com.tecstorm.housematch.dto.BedroomsDetailResponse;
import com.tecstorm.housematch.dto.PropertyResponse;
import com.tecstorm.housematch.entities.BedroomEntity;
import com.tecstorm.housematch.entities.PropertyEntity;
import com.tecstorm.housematch.repository.BedroomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class BedroomService {

    private final BedroomRepository bedroomRepository;

    public BedroomService(BedroomRepository bedroomRepository) {
        this.bedroomRepository = bedroomRepository;
    }

    public BedroomDetailResponse getById(UUID propertyId, UUID bedroomId) {
        BedroomEntity b = bedroomRepository.findByIdAndPropertyId(bedroomId, propertyId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        PropertyEntity p = b.getProperty();
        return new BedroomDetailResponse(
            new BedroomResponse(b.getId(), b.getTitle(), b.getTotalPeople(), b.getTotalBeds(), b.getPrice(), b.getSizeSqft(), b.getFurnished(), b.getPrivateBath(), b.getAvailableFromDate(), b.getAvailableToDate(), b.getMinStayMonths(), b.getPhotos(), b.getIsActive()),
            new PropertyResponse(p.getId(), p.getTitle(), p.getAddress(), p.getLat(), p.getLng(), p.getTotalPeople(), p.getTotalBedrooms(), p.getTotalBathrooms(), p.getLaundry(), p.getDishwasher(), p.getParking(), p.getAc(), p.getWifi(), p.getSizeSqft(), p.getPhotos())
        );
    }

    public BedroomsDetailResponse getByPropertyId(UUID propertyId) {
        List<BedroomEntity> bedrooms = bedroomRepository.findByPropertyId(propertyId);
        if (bedrooms.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        PropertyEntity p = bedrooms.get(0).getProperty();
        return new BedroomsDetailResponse(
            bedrooms.stream()
                .map(b -> new BedroomResponse(b.getId(), b.getTitle(), b.getTotalPeople(), b.getTotalBeds(), b.getPrice(), b.getSizeSqft(), b.getFurnished(), b.getPrivateBath(), b.getAvailableFromDate(), b.getAvailableToDate(), b.getMinStayMonths(), b.getPhotos(), b.getIsActive()))
                .toList(),
            new PropertyResponse(p.getId(), p.getTitle(), p.getAddress(), p.getLat(), p.getLng(), p.getTotalPeople(), p.getTotalBedrooms(), p.getTotalBathrooms(), p.getLaundry(), p.getDishwasher(), p.getParking(), p.getAc(), p.getWifi(), p.getSizeSqft(), p.getPhotos())
        );
    }
}
