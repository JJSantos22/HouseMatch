package com.tecstorm.housematch.entities;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

import com.tecstorm.housematch.entities.Student.StudentEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "search_preference")
public class SearchPreferenceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private StudentEntity student;

    @Column(name = "min_price")
    private Integer minPrice;

    @Column(name = "max_price")
    private Integer maxPrice;

    @Column(name = "min_stay_months")
    private Integer minStayMonths;

    @Column(name = "available_from")
    private LocalDate availableFrom;

    @Column(name = "furnished")
    private Boolean furnished;

    @Column(name = "private_bath")
    private Boolean privateBath;

    @Column(name = "private_room")
    private Boolean privateRoom;

    @Column(name = "max_roommates")
    private Integer maxRoommates;

    @Column(name = "max_bedrooms")
    private Integer maxBedrooms;

    @Column(name = "dishwasher")
    private Boolean dishwasher;

    @Column(name = "parking")
    private Boolean parking;

    @Column(name = "ac")
    private Boolean ac;

    @Column(name = "wifi")
    private Boolean wifi;

    @Enumerated(EnumType.STRING)
    @Column(name = "laundry")
    private Laundry laundry;

    @Column(name = "center_lat")
    private Double centerLat;

    @Column(name = "center_lng")
    private Double centerLng;

    @Column(name = "radius_km")
    private Integer radiusKm;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    protected SearchPreferenceEntity() {}

    public SearchPreferenceEntity(StudentEntity student) {
        this.student = student;
        this.createdAt = OffsetDateTime.now();
    }

    public UUID getId() { return id; }
    public StudentEntity getStudent() { return student; }

    public void setMinPrice(Integer minPrice) { this.minPrice = minPrice; }
    public void setMaxPrice(Integer maxPrice) { this.maxPrice = maxPrice; }
    public void setMinStayMonths(Integer minStayMonths) { this.minStayMonths = minStayMonths; }
    public void setAvailableFrom(LocalDate availableFrom) { this.availableFrom = availableFrom; }
    public void setFurnished(Boolean furnished) { this.furnished = furnished; }
    public void setPrivateBath(Boolean privateBath) { this.privateBath = privateBath; }
    public void setPrivateRoom(Boolean privateRoom) { this.privateRoom = privateRoom; }
    public void setMaxRoommates(Integer maxRoommates) { this.maxRoommates = maxRoommates; }
    public void setMaxBedrooms(Integer maxBedrooms) { this.maxBedrooms = maxBedrooms; }
    public void setDishwasher(Boolean dishwasher) { this.dishwasher = dishwasher; }
    public void setParking(Boolean parking) { this.parking = parking; }
    public void setAc(Boolean ac) { this.ac = ac; }
    public void setWifi(Boolean wifi) { this.wifi = wifi; }
    public void setLaundry(Laundry laundry) { this.laundry = laundry; }
    public void setCenterLat(Double centerLat) { this.centerLat = centerLat; }
    public void setCenterLng(Double centerLng) { this.centerLng = centerLng; }
    public void setRadiusKm(Integer radiusKm) { this.radiusKm = radiusKm; }
}
