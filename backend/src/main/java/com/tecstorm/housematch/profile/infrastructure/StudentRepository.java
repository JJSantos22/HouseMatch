package com.tecstorm.housematch.profile.infrastructure;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.profile.domain.StudentEntity;

public interface StudentRepository extends JpaRepository<StudentEntity, UUID> {
    Optional<StudentEntity> findByProfileId(UUID profileId);
}
