package com.tecstorm.housematch.property.domain;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import com.tecstorm.housematch.property.domain.BedroomEntity;
import com.tecstorm.housematch.property.domain.Laundry;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "property")
public class PropertyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "lat", nullable = false)
    private Double lat;

    @Column(name = "lng", nullable = false)
    private Double lng;

    @Column(name = "total_people", nullable = false)
    private Integer totalPeople;

    @Column(name = "total_bedrooms", nullable = false)
    private Integer totalBedrooms;

    @Column(name = "total_bathrooms", nullable = false)
    private Integer totalBathrooms;

    @Enumerated(EnumType.STRING)
    @Column(name = "laundry")
    private Laundry laundry;

    @Column(name = "dishwasher", nullable = false)
    private Boolean dishwasher;

    @Column(name = "parking", nullable = false)
    private Boolean parking;

    @Column(name = "ac", nullable = false)
    private Boolean ac;

    @Column(name = "wifi", nullable = false)
    private Boolean wifi;

    @Column(name = "size_sqft")
    private Integer sizeSqft;

    @Column(name = "photos", columnDefinition = "TEXT[]")
    private String[] photos;

    @Column(name = "embedding", columnDefinition = "vector(6)")
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VECTOR)
    private float[] embedding;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<BedroomEntity> bedrooms;

    protected PropertyEntity() {}

    public PropertyEntity(String title, String address, Double lat, Double lng, Integer totalBathrooms) {
        this.title = title;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.totalBathrooms = totalBathrooms;
        this.dishwasher = false;
        this.parking = false;
        this.ac = false;
        this.wifi = false;
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getAddress() { return address; }
    public Double getLat() { return lat; }
    public Double getLng() { return lng; }
    public Integer getTotalPeople() { return totalPeople; }
    public Integer getTotalBedrooms() { return totalBedrooms; }
    public Integer getTotalBathrooms() { return totalBathrooms; }
    public Laundry getLaundry() { return laundry; }
    public Boolean getDishwasher() { return dishwasher; }
    public Boolean getParking() { return parking; }
    public Boolean getAc() { return ac; }
    public Boolean getWifi() { return wifi; }
    public Integer getSizeSqft() { return sizeSqft; }
    public String[] getPhotos() { return photos; }
    public float[] getEmbedding() { return embedding; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public List<BedroomEntity> getBedrooms() { return bedrooms; }

    public void setEmbedding(float[] embedding) { this.embedding = embedding; }
}
