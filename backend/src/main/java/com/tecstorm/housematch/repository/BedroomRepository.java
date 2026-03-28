package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.BedroomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface BedroomRepository extends JpaRepository<BedroomEntity, UUID> {
    Optional<BedroomEntity> findByIdAndPropertyId(UUID id, UUID propertyId);
}
