package com.tecstorm.housematch.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.entities.Property.PropertyEntity;

public interface PropertyRepository extends JpaRepository<PropertyEntity, UUID> {
}
