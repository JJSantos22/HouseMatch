package com.tecstorm.housematch.searchpreference.infrastructure;

import com.tecstorm.housematch.searchpreference.domain.SearchPreferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface SearchPreferenceRepository extends JpaRepository<SearchPreferenceEntity, UUID> {
    Optional<SearchPreferenceEntity> findByStudent_Id(UUID studentId);
}
