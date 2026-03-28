package com.tecstorm.housematch.review.application;

import com.tecstorm.housematch.review.api.dto.ReviewResponse;
import com.tecstorm.housematch.review.infrastructure.ReviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<ReviewResponse> getByPropertyId(UUID propertyId) {
        return reviewRepository.findByPropertyId(propertyId).stream()
            .map(r -> new ReviewResponse(r.getId(), r.getStudent().getId(), r.getRating(), r.getComment(), r.getCreatedAt()))
            .toList();
    }

    public List<ReviewResponse> getByStudentId(UUID studentId) {
        return reviewRepository.findByStudentId(studentId).stream()
            .map(r -> new ReviewResponse(r.getId(), r.getStudent().getId(), r.getRating(), r.getComment(), r.getCreatedAt()))
            .toList();
    }
}
