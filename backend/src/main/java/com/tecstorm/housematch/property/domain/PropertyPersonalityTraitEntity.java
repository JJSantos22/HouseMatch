package com.tecstorm.housematch.property.domain;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "property_personality_trait")
@IdClass(PropertyPersonalityTraitId.class)
public class PropertyPersonalityTraitEntity {
    @Id
    @Column(name = "property_id")
    private UUID propertyId;

    @Id
    @Column(name = "personality_trait_id")
    private UUID personalityTraitId;

    protected PropertyPersonalityTraitEntity() {}

    public PropertyPersonalityTraitEntity(UUID propertyId, UUID personalityTraitId) {
        this.propertyId = propertyId;
        this.personalityTraitId = personalityTraitId;
    }
}
