package com.tecstorm.housematch.property.infrastructure;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.property.domain.BedroomEntity;

public interface BedroomRepository extends JpaRepository<BedroomEntity, UUID> {
    Optional<BedroomEntity> findByIdAndPropertyId(UUID id, UUID propertyId);
    List<BedroomEntity> findByPropertyId(UUID propertyId);
}
