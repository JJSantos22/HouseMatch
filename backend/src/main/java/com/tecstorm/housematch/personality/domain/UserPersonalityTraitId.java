package com.tecstorm.housematch.personality.domain;

import java.io.Serializable;
import java.util.UUID;

public class UserPersonalityTraitId implements Serializable {
    private UUID studentId;
    private UUID personalityTraitId;

    public UserPersonalityTraitId() {}

    public UserPersonalityTraitId(UUID studentId, UUID personalityTraitId) {
        this.studentId = studentId;
        this.personalityTraitId = personalityTraitId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserPersonalityTraitId that)) return false;
        return studentId.equals(that.studentId) && personalityTraitId.equals(that.personalityTraitId);
    }

    @Override
    public int hashCode() {
        return studentId.hashCode() + personalityTraitId.hashCode();
    }
}
