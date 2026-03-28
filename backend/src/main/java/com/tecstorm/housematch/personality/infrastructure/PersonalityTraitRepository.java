package com.tecstorm.housematch.personality.infrastructure;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.personality.domain.PersonalityTraitEntity;

public interface PersonalityTraitRepository extends JpaRepository<PersonalityTraitEntity, UUID> {
}
