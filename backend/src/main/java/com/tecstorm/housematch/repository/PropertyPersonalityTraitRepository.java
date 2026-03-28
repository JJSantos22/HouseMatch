package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.PersonalityCategory;
import com.tecstorm.housematch.entities.PersonalityTraitEntity;
import com.tecstorm.housematch.entities.PropertyPersonalityTraitEntity;
import com.tecstorm.housematch.entities.PropertyPersonalityTraitId;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PropertyPersonalityTraitRepository extends JpaRepository<PropertyPersonalityTraitEntity, PropertyPersonalityTraitId> {
    @Query("SELECT p FROM PropertyPersonalityTraitEntity pt JOIN PersonalityTraitEntity p ON pt.personalityTraitId = p.id WHERE pt.propertyId = :propertyId")
    List<PersonalityTraitEntity> findTraitsByPropertyId(UUID propertyId);

    @Modifying
    @Query("DELETE FROM PropertyPersonalityTraitEntity pt WHERE pt.propertyId = :propertyId AND pt.personalityTraitId IN (SELECT p.id FROM PersonalityTraitEntity p WHERE p.category = :category)")
    void deleteByPropertyIdAndCategory(UUID propertyId, PersonalityCategory category);
}
