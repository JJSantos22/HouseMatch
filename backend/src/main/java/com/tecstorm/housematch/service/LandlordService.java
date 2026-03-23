package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.entities.LandlordEntity;
import com.tecstorm.housematch.repository.LandlordRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class LandlordService {

    private final LandlordRepository landlordRepository;

    public LandlordService(LandlordRepository landlordRepository) {
        this.landlordRepository = landlordRepository;
    }

    public LandlordEntity get(UUID profileId) {
        return landlordRepository.findByProfileId(profileId)
            .orElseThrow(() -> new RuntimeException("Landlord not found"));
    }

    public void update(UUID profileId, UpdateProfileRequest request) {
        LandlordEntity landlord = get(profileId);
        landlord.setPhone(request.phone());
        landlordRepository.save(landlord);
    }
}
