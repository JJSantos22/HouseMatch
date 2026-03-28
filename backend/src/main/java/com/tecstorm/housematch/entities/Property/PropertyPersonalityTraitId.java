package com.tecstorm.housematch.entities.Property;

import java.io.Serializable;
import java.util.UUID;

public class PropertyPersonalityTraitId implements Serializable {
    private UUID propertyId;
    private UUID personalityTraitId;

    public PropertyPersonalityTraitId() {}

    public PropertyPersonalityTraitId(UUID propertyId, UUID personalityTraitId) {
        this.propertyId = propertyId;
        this.personalityTraitId = personalityTraitId;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof PropertyPersonalityTraitId that)) return false;
        return propertyId.equals(that.propertyId) && personalityTraitId.equals(that.personalityTraitId);
    }

    @Override
    public int hashCode() {
        return propertyId.hashCode() + personalityTraitId.hashCode();
    }
}
