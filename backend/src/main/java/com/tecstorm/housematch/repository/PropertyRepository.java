package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.PropertyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PropertyRepository extends JpaRepository<PropertyEntity, UUID> {
}
