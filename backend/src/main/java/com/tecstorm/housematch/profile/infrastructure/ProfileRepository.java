package com.tecstorm.housematch.profile.infrastructure;

import com.tecstorm.housematch.profile.domain.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface ProfileRepository extends JpaRepository<ProfileEntity, UUID> {
    Optional<ProfileEntity> findByEmailAndPassword(String email, String password);
}
