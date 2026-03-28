package com.tecstorm.housematch.profile.infrastructure;

import com.tecstorm.housematch.profile.domain.LandlordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface LandlordRepository extends JpaRepository<LandlordEntity, UUID> {
    Optional<LandlordEntity> findByProfileId(UUID profileId);
}
