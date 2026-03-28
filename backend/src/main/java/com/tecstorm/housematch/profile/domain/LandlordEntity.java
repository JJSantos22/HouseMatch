package com.tecstorm.housematch.profile.domain;

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

    protected LandlordEntity() {}

    public LandlordEntity(ProfileEntity profile, String phone) {
        this.profile = profile;
        this.phone = phone;
    }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
