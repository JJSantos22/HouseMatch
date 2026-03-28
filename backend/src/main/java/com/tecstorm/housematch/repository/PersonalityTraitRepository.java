package com.tecstorm.housematch.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.entities.Personality.PersonalityTraitEntity;

public interface PersonalityTraitRepository extends JpaRepository<PersonalityTraitEntity, UUID> {
}
