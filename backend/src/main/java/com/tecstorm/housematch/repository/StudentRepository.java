package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<StudentEntity, UUID> {
    Optional<StudentEntity> findByProfileId(UUID profileId);
}
