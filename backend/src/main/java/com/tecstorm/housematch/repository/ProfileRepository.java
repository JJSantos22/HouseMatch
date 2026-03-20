package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProfileRepository extends JpaRepository<ProfileEntity, UUID> {
}
