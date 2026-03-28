package com.tecstorm.housematch.entities.Bedroom;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

import com.tecstorm.housematch.entities.Property.PropertyEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bedroom")
public class BedroomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private PropertyEntity property;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "total_people", nullable = false)
    private Integer totalPeople;

    @Column(name = "total_beds", nullable = false)
    private Integer totalBeds;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "size_sqft")
    private Integer sizeSqft;

    @Column(name = "furnished", nullable = false)
    private Boolean furnished;

    @Column(name = "private_bath", nullable = false)
    private Boolean privateBath;

    @Column(name = "available_from_date", nullable = false)
    private LocalDate availableFromDate;

    @Column(name = "available_to_date", nullable = false)
    private LocalDate availableToDate;

    @Column(name = "min_stay_months", nullable = false)
    private Integer minStayMonths;

    @Column(name = "photos", columnDefinition = "TEXT[]")
    private String[] photos;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    protected BedroomEntity() {}

    public BedroomEntity(PropertyEntity property, String title, Integer totalPeople, Integer totalBeds, Integer price, LocalDate availableFromDate, LocalDate availableToDate, Integer minStayMonths) {
        this.property = property;
        this.title = title;
        this.totalPeople = totalPeople;
        this.totalBeds = totalBeds;
        this.price = price;
        this.availableFromDate = availableFromDate;
        this.availableToDate = availableToDate;
        this.minStayMonths = minStayMonths;
        this.furnished = false;
        this.privateBath = false;
        this.isActive = true;
    }

    public UUID getId() { return id; }
    public PropertyEntity getProperty() { return property; }
    public String getTitle() { return title; }
    public Integer getTotalPeople() { return totalPeople; }
    public Integer getTotalBeds() { return totalBeds; }
    public Integer getPrice() { return price; }
    public Integer getSizeSqft() { return sizeSqft; }
    public Boolean getFurnished() { return furnished; }
    public Boolean getPrivateBath() { return privateBath; }
    public LocalDate getAvailableFromDate() { return availableFromDate; }
    public LocalDate getAvailableToDate() { return availableToDate; }
    public Integer getMinStayMonths() { return minStayMonths; }
    public String[] getPhotos() { return photos; }
    public Boolean getIsActive() { return isActive; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
