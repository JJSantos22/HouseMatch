package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.PersonalityTraitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface PersonalityTraitRepository extends JpaRepository<PersonalityTraitEntity, UUID> {
}
