package com.tecstorm.housematch.matching.application;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.tecstorm.housematch.ai.CompatibilityScorer;
import com.tecstorm.housematch.ai.MatchResult;
import com.tecstorm.housematch.matching.api.dto.BedroomMatchResponse;
import com.tecstorm.housematch.matching.api.dto.BedroomMatchesResponse;
import com.tecstorm.housematch.matching.domain.UniversityDistanceCalculator;
import com.tecstorm.housematch.property.api.dto.BedroomResponse;
import com.tecstorm.housematch.matching.api.dto.PropertyMatchReasonResponse;
import com.tecstorm.housematch.matching.api.dto.PropertyMatchResponse;
import com.tecstorm.housematch.property.api.dto.PropertyResponse;
import com.tecstorm.housematch.matching.api.dto.TraitMatchBreakdownResponse;
import com.tecstorm.housematch.personality.application.PersonalityTraitService;
import com.tecstorm.housematch.personality.application.PropertyTraitService;
import com.tecstorm.housematch.profile.application.StudentService;
import com.tecstorm.housematch.property.domain.BedroomEntity;
import com.tecstorm.housematch.property.domain.PropertyEntity;
import com.tecstorm.housematch.property.infrastructure.BedroomRepository;
import com.tecstorm.housematch.property.infrastructure.PropertyRepository;

@Service
public class BedroomMatchingService {
    private final BedroomRepository bedroomRepository;
    private final StudentService studentService;
    private final PersonalityTraitService personalityTraitService;
    private final PropertyTraitService propertyTraitService;
    private final PropertyRepository propertyRepository;
    private final CompatibilityScorer compatibilityScorer;

    public BedroomMatchingService(
        BedroomRepository bedroomRepository,
        StudentService studentService,
        PersonalityTraitService personalityTraitService,
        PropertyTraitService propertyTraitService,
        PropertyRepository propertyRepository
    ) {
        this.bedroomRepository = bedroomRepository;
        this.studentService = studentService;
        this.personalityTraitService = personalityTraitService;
        this.propertyTraitService = propertyTraitService;
        this.propertyRepository = propertyRepository;
        this.compatibilityScorer = new CompatibilityScorer();
    }

    @Transactional(readOnly = true)
    public BedroomMatchesResponse getMatchesByProfileId(UUID profileId) {
        var student = studentService.get(profileId);
        UUID studentId = student.getId();
        var studentInput = personalityTraitService.getMatchInput(studentId);
        String universityName = student.getUniversity();

        List<BedroomMatchResponse> matches = bedroomRepository.findAll().stream()
            .filter(bedroom -> Boolean.TRUE.equals(bedroom.getIsActive()))
            .map(bedroom -> {
                var property = bedroom.getProperty();
                Double distanceKm = UniversityDistanceCalculator.distanceKm(universityName, property.getLat(), property.getLng());
                MatchResult result = scoreWithDistanceCompatibility(
                    studentInput,
                    propertyTraitService.getMatchInput(property.getId()),
                    distanceKm
                );
                return toMatchResponse(bedroom, result);
            })
            .sorted(Comparator.comparing(BedroomMatchResponse::score).reversed())
            .toList();

        return new BedroomMatchesResponse(matches);
    }

    @Transactional(readOnly = true)
    public PropertyMatchResponse getPropertyMatch(UUID propertyId, UUID profileId) {
        var student = studentService.get(profileId);
        UUID studentId = student.getId();
        PropertyEntity property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var studentInput = personalityTraitService.getMatchInput(studentId);
        var propertyInput = propertyTraitService.getMatchInput(propertyId);
        Double distanceKm = UniversityDistanceCalculator.distanceKm(student.getUniversity(), property.getLat(), property.getLng());
        return toPropertyMatchResponse(property, scoreWithDistanceCompatibility(studentInput, propertyInput, distanceKm));
    }

    private MatchResult scoreWithDistanceCompatibility(
        com.tecstorm.housematch.ai.MatchInput studentInput,
        com.tecstorm.housematch.ai.MatchInput propertyInput,
        Double distanceKm
    ) {
        try {
            return compatibilityScorer.score(studentInput, propertyInput, distanceKm);
        } catch (NoSuchMethodError ignored) {
            // Fallback for stale runtime ai artifact that only has 2-arg score.
            return compatibilityScorer.score(studentInput, propertyInput);
        }
    }

    private BedroomMatchResponse toMatchResponse(BedroomEntity bedroom, MatchResult result) {
        PropertyEntity property = bedroom.getProperty();
        return new BedroomMatchResponse(
            new BedroomResponse(
                bedroom.getId(),
                bedroom.getTitle(),
                bedroom.getTotalPeople(),
                bedroom.getTotalBeds(),
                bedroom.getPrice(),
                bedroom.getSizeSqft(),
                bedroom.getFurnished(),
                bedroom.getPrivateBath(),
                bedroom.getAvailableFromDate(),
                bedroom.getAvailableToDate(),
                bedroom.getMinStayMonths(),
                bedroom.getPhotos(),
                bedroom.getIsActive()
            ),
            toPropertyResponse(property),
            result.score(),
            result.breakdown().stream()
                .map(trait -> new TraitMatchBreakdownResponse(
                    trait.trait(),
                    trait.studentValue(),
                    trait.bedroomValue(),
                    trait.weight(),
                    trait.points(),
                    trait.score()
                ))
                .toList()
        );
    }

    private PropertyMatchResponse toPropertyMatchResponse(PropertyEntity property, MatchResult result) {
        return new PropertyMatchResponse(
            toPropertyResponse(property),
            result.score(),
            result.breakdown().stream()
                .map(trait -> new PropertyMatchReasonResponse(
                    trait.trait(),
                    trait.studentValue(),
                    trait.bedroomValue(),
                    trait.weight(),
                    trait.points(),
                    trait.score()
                ))
                .toList()
        );
    }

    private PropertyResponse toPropertyResponse(PropertyEntity property) {
        return new PropertyResponse(
            property.getId(),
            property.getTitle(),
            property.getAddress(),
            property.getLat(),
            property.getLng(),
            property.getTotalPeople(),
            property.getTotalBedrooms(),
            property.getTotalBathrooms(),
            property.getLaundry(),
            property.getDishwasher(),
            property.getParking(),
            property.getAc(),
            property.getWifi(),
            property.getSizeSqft(),
            property.getPhotos()
        );
    }
}
