package com.tecstorm.housematch.review.infrastructure;

import com.tecstorm.housematch.review.domain.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<ReviewEntity, UUID> {
    List<ReviewEntity> findByPropertyId(UUID propertyId);
    List<ReviewEntity> findByStudentId(UUID studentId);
}
