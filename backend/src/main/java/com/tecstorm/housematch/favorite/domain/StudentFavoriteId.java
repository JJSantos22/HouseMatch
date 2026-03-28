package com.tecstorm.housematch.favorite.domain;

import java.io.Serializable;
import java.util.UUID;

public class StudentFavoriteId implements Serializable {
    private UUID studentId;
    private UUID bedroomId;

    public StudentFavoriteId() {}

    public StudentFavoriteId(UUID studentId, UUID bedroomId) {
        this.studentId = studentId;
        this.bedroomId = bedroomId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentFavoriteId that)) return false;
        return studentId.equals(that.studentId) && bedroomId.equals(that.bedroomId);
    }

    @Override
    public int hashCode() {
        return studentId.hashCode() + bedroomId.hashCode();
    }
}
