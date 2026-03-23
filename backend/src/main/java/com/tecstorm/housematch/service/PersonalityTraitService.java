package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.PersonalityTraitsResponse;
import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.entities.*;
import com.tecstorm.housematch.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PersonalityTraitService {

    private final PersonalityTraitRepository personalityTraitRepository;
    private final UserPersonalityTraitRepository userPersonalityTraitRepository;

    public PersonalityTraitService(PersonalityTraitRepository personalityTraitRepository, UserPersonalityTraitRepository userPersonalityTraitRepository) {
        this.personalityTraitRepository = personalityTraitRepository;
        this.userPersonalityTraitRepository = userPersonalityTraitRepository;
    }

    public PersonalityTraitsResponse get(UUID studentId) {
        Map<PersonalityCategory, PersonalityLevel> traitMap = userPersonalityTraitRepository.findTraitsByStudentId(studentId).stream()
            .collect(Collectors.toMap(PersonalityTraitEntity::getCategory, PersonalityTraitEntity::getLevel));

        return new PersonalityTraitsResponse(
            traitMap.get(PersonalityCategory.SCHEDULE),
            traitMap.get(PersonalityCategory.SOCIAL),
            traitMap.get(PersonalityCategory.CLEANLINESS),
            traitMap.get(PersonalityCategory.ACADEMIC),
            traitMap.get(PersonalityCategory.LIFESTYLE),
            traitMap.get(PersonalityCategory.PRIORITY)
        );
    }

    public void update(UUID studentId, UpdateProfileRequest request) {
        var allTraits = personalityTraitRepository.findAll();
        save(studentId, PersonalityCategory.SCHEDULE, request.schedule(), allTraits);
        save(studentId, PersonalityCategory.SOCIAL, request.social(), allTraits);
        save(studentId, PersonalityCategory.CLEANLINESS, request.cleanliness(), allTraits);
        save(studentId, PersonalityCategory.ACADEMIC, request.academic(), allTraits);
        save(studentId, PersonalityCategory.LIFESTYLE, request.lifestyle(), allTraits);
        save(studentId, PersonalityCategory.PRIORITY, request.priority(), allTraits);
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
}
