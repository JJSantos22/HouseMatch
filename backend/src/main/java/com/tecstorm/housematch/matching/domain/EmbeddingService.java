package com.tecstorm.housematch.matching.domain;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.tecstorm.housematch.personality.domain.PersonalityCategory;
import com.tecstorm.housematch.personality.domain.PersonalityLevel;

@Service
public class EmbeddingService {
    public float[] forTraitMap(Map<PersonalityCategory, PersonalityLevel> traitMap) {
        return new float[] {
            normalizeSchedule(traitMap.get(PersonalityCategory.SCHEDULE)),
            normalizeSocial(traitMap.get(PersonalityCategory.SOCIAL)),
            normalizePreference(traitMap.get(PersonalityCategory.NOISE)),
            normalizeAcademic(traitMap.get(PersonalityCategory.ACADEMIC)),
            normalizeCleanliness(traitMap.get(PersonalityCategory.CLEANLINESS)),
            normalizePreference(traitMap.get(PersonalityCategory.GUEST_FREQUENCY))
        };
    }

    private float normalizeSchedule(PersonalityLevel level) {
        if (level == null) return 0f;
        return switch (level) {
            case EARLY_BIRD -> 0f;
            case BALANCED -> 0.5f;
            case NIGHT_OWL -> 1f;
            default -> 0f;
        };
    }

    private float normalizeSocial(PersonalityLevel level) {
        if (level == null) return 0f;
        return switch (level) {
            case INTROVERT -> 0f;
            case AMBIVERT -> 0.5f;
            case EXTROVERT -> 1f;
            default -> 0f;
        };
    }

    private float normalizePreference(PersonalityLevel level) {
        if (level == null) return 0f;
        return switch (level) {
            case LOW -> 0f;
            case MEDIUM -> 0.5f;
            case HIGH -> 1f;
            default -> 0f;
        };
    }

    private float normalizeAcademic(PersonalityLevel level) {
        if (level == null) return 0f;
        return switch (level) {
            case CASUAL -> 0f;
            case BALANCED -> 0.5f;
            case INTENSIVE -> 1f;
            default -> 0f;
        };
    }

    private float normalizeCleanliness(PersonalityLevel level) {
        if (level == null) return 0f;
        return switch (level) {
            case RELAXED -> 0f;
            case MODERATE -> 0.5f;
            case STRICT -> 1f;
            default -> 0f;
        };
    }
}
