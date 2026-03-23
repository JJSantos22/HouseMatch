package com.tecstorm.housematch.entities;

import jakarta.persistence.*;
import java.util.UUID;

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
