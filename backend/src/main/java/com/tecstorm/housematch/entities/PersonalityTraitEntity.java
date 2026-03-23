package com.tecstorm.housematch.entities;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "personality_trait")
public class PersonalityTraitEntity {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private PersonalityCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private PersonalityLevel level;

    @Column(name = "description")
    private String description;

    public UUID getId() { return id; }
    public PersonalityCategory getCategory() { return category; }
    public PersonalityLevel getLevel() { return level; }
}
