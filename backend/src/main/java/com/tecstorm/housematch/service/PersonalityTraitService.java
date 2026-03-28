package com.tecstorm.housematch.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tecstorm.housematch.ai.MatchInput;
import com.tecstorm.housematch.dto.PersonalityTraitsResponse;
import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.entities.Personality.PersonalityCategory;
import com.tecstorm.housematch.entities.Personality.PersonalityLevel;
import com.tecstorm.housematch.entities.Personality.PersonalityTraitEntity;
import com.tecstorm.housematch.entities.User.UserPersonalityTraitEntity;
import com.tecstorm.housematch.repository.PersonalityTraitRepository;
import com.tecstorm.housematch.repository.UserPersonalityTraitRepository;

@Service
public class PersonalityTraitService {

    private final PersonalityTraitRepository personalityTraitRepository;
    private final UserPersonalityTraitRepository userPersonalityTraitRepository;

    public PersonalityTraitService(PersonalityTraitRepository personalityTraitRepository, UserPersonalityTraitRepository userPersonalityTraitRepository) {
        this.personalityTraitRepository = personalityTraitRepository;
        this.userPersonalityTraitRepository = userPersonalityTraitRepository;
    }

    public PersonalityTraitsResponse get(UUID studentId) {
        return toResponse(getTraitMap(studentId));
    }

    public MatchInput getMatchInput(UUID studentId) {
        return TraitMatchInputMapper.toMatchInput(getTraitMap(studentId));
    }

    public Map<PersonalityCategory, PersonalityLevel> getTraitMapForStudent(UUID studentId) {
        return getTraitMap(studentId);
    }

    public void update(UUID studentId, UpdateProfileRequest request) {
        var allTraits = personalityTraitRepository.findAll();
        save(studentId, PersonalityCategory.SCHEDULE, request.schedule(), allTraits);
        save(studentId, PersonalityCategory.SOCIAL, request.social(), allTraits);
        save(studentId, PersonalityCategory.NOISE, request.noise(), allTraits);
        save(studentId, PersonalityCategory.ACADEMIC, request.academic(), allTraits);
        save(studentId, PersonalityCategory.CLEANLINESS, request.cleanliness(), allTraits);
        save(studentId, PersonalityCategory.GUEST_FREQUENCY, request.guest_frequency(), allTraits);
    }

    private void save(UUID studentId, PersonalityCategory category, PersonalityLevel level, List<PersonalityTraitEntity> allTraits) {
        if (level == null) return;
        allTraits.stream()
            .filter(t -> t.getCategory() == category && t.getLevel() == level)
            .findFirst()
            .ifPresent(trait -> {
                userPersonalityTraitRepository.deleteByStudentIdAndCategory(studentId, category);
                userPersonalityTraitRepository.save(new UserPersonalityTraitEntity(studentId, trait.getId()));
            });
    }

    private Map<PersonalityCategory, PersonalityLevel> getTraitMap(UUID studentId) {
        return userPersonalityTraitRepository.findTraitsByStudentId(studentId).stream()
            .collect(Collectors.toMap(PersonalityTraitEntity::getCategory, PersonalityTraitEntity::getLevel));
    }

    private PersonalityTraitsResponse toResponse(Map<PersonalityCategory, PersonalityLevel> traitMap) {
        return new PersonalityTraitsResponse(
            traitMap.get(PersonalityCategory.SCHEDULE),
            traitMap.get(PersonalityCategory.SOCIAL),
            traitMap.get(PersonalityCategory.NOISE),
            traitMap.get(PersonalityCategory.ACADEMIC),
            traitMap.get(PersonalityCategory.CLEANLINESS),
            traitMap.get(PersonalityCategory.GUEST_FREQUENCY)
        );
    }
}
