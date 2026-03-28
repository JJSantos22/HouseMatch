package com.tecstorm.housematch.property.infrastructure;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.property.domain.PropertyEntity;

public interface PropertyRepository extends JpaRepository<PropertyEntity, UUID> {
}
