package com.tecstorm.housematch.entities;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "student_favorite")
@IdClass(StudentFavoriteId.class)
public class StudentFavoriteEntity {

    @Id
    @Column(name = "student_id")
    private UUID studentId;

    @Id
    @Column(name = "bedroom_id")
    private UUID bedroomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bedroom_id", insertable = false, updatable = false)
    private BedroomEntity bedroom;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    protected StudentFavoriteEntity() {}

    public StudentFavoriteEntity(UUID studentId, UUID bedroomId) {
        this.studentId = studentId;
        this.bedroomId = bedroomId;
        this.createdAt = OffsetDateTime.now();
    }

    public UUID getStudentId() { return studentId; }
    public UUID getBedroomId() { return bedroomId; }
    public BedroomEntity getBedroom() { return bedroom; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
