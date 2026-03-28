package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.ReviewResponse;
import com.tecstorm.housematch.repository.ReviewRepository;
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
}
