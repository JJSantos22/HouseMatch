package com.tecstorm.housematch.entities.User;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_personality_trait")
@IdClass(UserPersonalityTraitId.class)
public class UserPersonalityTraitEntity {
    @Id
    @Column(name = "student_id")
    private UUID studentId;

    @Id
    @Column(name = "personality_trait_id")
    private UUID personalityTraitId;

    protected UserPersonalityTraitEntity() {}

    public UserPersonalityTraitEntity(UUID studentId, UUID personalityTraitId) {
        this.studentId = studentId;
        this.personalityTraitId = personalityTraitId;
    }

}
