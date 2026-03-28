package com.tecstorm.housematch.profile.domain;

import java.util.UUID;

import com.tecstorm.housematch.profile.domain.ProfileEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class StudentEntity {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "profile_id", nullable = false, unique = true)
    private ProfileEntity profile;

    @Column(name = "university")
    private String university;

    protected StudentEntity() {}

    public StudentEntity(ProfileEntity profile, String university) {
        this.profile = profile;
        this.university = university;
    }

    public UUID getId() { return id; }
    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }
}
