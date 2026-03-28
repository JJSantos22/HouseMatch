package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.SearchPreferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface SearchPreferenceRepository extends JpaRepository<SearchPreferenceEntity, UUID> {
    Optional<SearchPreferenceEntity> findByStudent_Id(UUID studentId);
}
