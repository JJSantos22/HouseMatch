package com.tecstorm.housematch.entities;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "landlord")
public class LandlordEntity {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "profile_id", nullable = false, unique = true)
    private ProfileEntity profile;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    protected LandlordEntity() {}

    public LandlordEntity(ProfileEntity profile, String phone, String email) {
        this.profile = profile;
        this.phone = phone;
        this.email = email;
    }

    public String getPhone() { return phone; }
    public String getEmail() { return email; }
}
