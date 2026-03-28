package com.tecstorm.housematch.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.tecstorm.housematch.ai.MatchInput;
import com.tecstorm.housematch.dto.Property.PropertyTraitsResponse;
import com.tecstorm.housematch.dto.UpdatePropertyTraitsRequest;
import com.tecstorm.housematch.entities.Personality.PersonalityCategory;
import com.tecstorm.housematch.entities.Personality.PersonalityLevel;
import com.tecstorm.housematch.entities.Personality.PersonalityTraitEntity;
import com.tecstorm.housematch.entities.Property.PropertyEntity;
import com.tecstorm.housematch.entities.Property.PropertyPersonalityTraitEntity;
import com.tecstorm.housematch.repository.PersonalityTraitRepository;
import com.tecstorm.housematch.repository.PropertyPersonalityTraitRepository;
import com.tecstorm.housematch.repository.PropertyRepository;

@Service
public class PropertyTraitService {
    private final PropertyRepository propertyRepository;
    private final PersonalityTraitRepository personalityTraitRepository;
    private final PropertyPersonalityTraitRepository propertyPersonalityTraitRepository;
    private final EmbeddingService embeddingService;

    public PropertyTraitService(
        PropertyRepository propertyRepository,
        PersonalityTraitRepository personalityTraitRepository,
        PropertyPersonalityTraitRepository propertyPersonalityTraitRepository,
        EmbeddingService embeddingService
    ) {
        this.propertyRepository = propertyRepository;
        this.personalityTraitRepository = personalityTraitRepository;
        this.propertyPersonalityTraitRepository = propertyPersonalityTraitRepository;
        this.embeddingService = embeddingService;
    }

    @Transactional(readOnly = true)
    public PropertyTraitsResponse get(UUID propertyId) {
        assertProperty(propertyId);
        return toResponse(getTraitMap(propertyId));
    }

    @Transactional(readOnly = true)
    public MatchInput getMatchInput(UUID propertyId) {
        return TraitMatchInputMapper.toMatchInput(getTraitMap(propertyId));
    }

    @Transactional
    public void update(UUID propertyId, UpdatePropertyTraitsRequest request) {
        PropertyEntity property = assertProperty(propertyId);
        var allTraits = personalityTraitRepository.findAll();
        save(propertyId, PersonalityCategory.SCHEDULE, request.schedule(), allTraits);
        save(propertyId, PersonalityCategory.SOCIAL, request.social(), allTraits);
        save(propertyId, PersonalityCategory.NOISE, request.noise(), allTraits);
        save(propertyId, PersonalityCategory.ACADEMIC, request.academic(), allTraits);
        save(propertyId, PersonalityCategory.CLEANLINESS, request.cleanliness(), allTraits);
        save(propertyId, PersonalityCategory.GUEST_FREQUENCY, request.guestFrequency(), allTraits);
        property.setEmbedding(embeddingService.forTraitMap(getTraitMap(propertyId)));
        propertyRepository.save(property);
    }

    @Transactional
    public void rebuildEmbedding(UUID propertyId) {
        PropertyEntity property = assertProperty(propertyId);
        property.setEmbedding(embeddingService.forTraitMap(getTraitMap(propertyId)));
        propertyRepository.save(property);
    }

    private Map<PersonalityCategory, PersonalityLevel> getTraitMap(UUID propertyId) {
        return propertyPersonalityTraitRepository.findTraitsByPropertyId(propertyId).stream()
            .collect(Collectors.toMap(PersonalityTraitEntity::getCategory, PersonalityTraitEntity::getLevel));
    }

    private PropertyTraitsResponse toResponse(Map<PersonalityCategory, PersonalityLevel> traitMap) {
        return new PropertyTraitsResponse(
            traitMap.get(PersonalityCategory.SCHEDULE),
            traitMap.get(PersonalityCategory.SOCIAL),
            traitMap.get(PersonalityCategory.NOISE),
            traitMap.get(PersonalityCategory.ACADEMIC),
            traitMap.get(PersonalityCategory.CLEANLINESS),
            traitMap.get(PersonalityCategory.GUEST_FREQUENCY)
        );
    }

    private void save(UUID propertyId, PersonalityCategory category, PersonalityLevel level, List<PersonalityTraitEntity> allTraits) {
        if (level == null) return;
        allTraits.stream()
            .filter(t -> t.getCategory() == category && t.getLevel() == level)
            .findFirst()
            .ifPresent(trait -> {
                propertyPersonalityTraitRepository.deleteByPropertyIdAndCategory(propertyId, category);
                propertyPersonalityTraitRepository.save(new PropertyPersonalityTraitEntity(propertyId, trait.getId()));
            });
    }

    private PropertyEntity assertProperty(UUID propertyId) {
        return propertyRepository.findById(propertyId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
