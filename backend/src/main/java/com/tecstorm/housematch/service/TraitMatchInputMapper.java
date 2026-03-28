package com.tecstorm.housematch.service;

import com.tecstorm.housematch.ai.MatchInput;
import com.tecstorm.housematch.entities.PersonalityCategory;
import com.tecstorm.housematch.entities.PersonalityLevel;
import java.util.Map;

final class TraitMatchInputMapper {
    private TraitMatchInputMapper() {}

    static MatchInput toMatchInput(Map<PersonalityCategory, PersonalityLevel> traitMap) {
        return new MatchInput(
            toSchedule(traitMap.get(PersonalityCategory.SCHEDULE)),
            toSocial(traitMap.get(PersonalityCategory.SOCIAL)),
            toPreference(traitMap.get(PersonalityCategory.NOISE)),
            toAcademic(traitMap.get(PersonalityCategory.ACADEMIC)),
            toCleanliness(traitMap.get(PersonalityCategory.CLEANLINESS)),
            toPreference(traitMap.get(PersonalityCategory.GUEST_FREQUENCY))
        );
    }

    private static MatchInput.Schedule toSchedule(PersonalityLevel level) {
        if (level == null) return null;
        return MatchInput.Schedule.valueOf(level.name());
    }

    private static MatchInput.Social toSocial(PersonalityLevel level) {
        if (level == null) return null;
        return MatchInput.Social.valueOf(level.name());
    }

    private static MatchInput.Preference toPreference(PersonalityLevel level) {
        if (level == null) return null;
        return MatchInput.Preference.valueOf(level.name());
    }

    private static MatchInput.Academic toAcademic(PersonalityLevel level) {
        if (level == null) return null;
        return MatchInput.Academic.valueOf(level.name());
    }

    private static MatchInput.Cleanliness toCleanliness(PersonalityLevel level) {
        if (level == null) return null;
        return MatchInput.Cleanliness.valueOf(level.name());
    }
}
