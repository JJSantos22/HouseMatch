package com.tecstorm.housematch.entities;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "profile")
public class ProfileEntity {
    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    protected ProfileEntity() {}

    public ProfileEntity(UUID id, String name, UserRole role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public UserRole getRole() { return role; }
}
