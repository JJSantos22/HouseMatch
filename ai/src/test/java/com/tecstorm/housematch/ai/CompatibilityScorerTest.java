package com.tecstorm.housematch.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CompatibilityScorerTest {
    private final CompatibilityScorer scorer = new CompatibilityScorer();

    @Test
    void exactMatchReturnsOneHundred() {
        MatchInput input = new MatchInput(
            MatchInput.Schedule.BALANCED,
            MatchInput.Social.AMBIVERT,
            MatchInput.Preference.MEDIUM,
            MatchInput.Academic.BALANCED,
            MatchInput.Cleanliness.MODERATE,
            MatchInput.Preference.MEDIUM
        );

        MatchResult result = scorer.score(input, input);

        assertEquals(100, result.score());
        assertEquals(result.maxPoints(), result.totalPoints());
    }

    @Test
    void missingTraitContributesZero() {
        MatchInput student = new MatchInput(
            MatchInput.Schedule.EARLY_BIRD,
            MatchInput.Social.INTROVERT,
            MatchInput.Preference.LOW,
            MatchInput.Academic.CASUAL,
            MatchInput.Cleanliness.RELAXED,
            MatchInput.Preference.LOW
        );
        MatchInput bedroom = new MatchInput(
            null,
            MatchInput.Social.INTROVERT,
            MatchInput.Preference.MEDIUM,
            MatchInput.Academic.CASUAL,
            MatchInput.Cleanliness.MODERATE,
            MatchInput.Preference.HIGH
        );

        MatchResult result = scorer.score(student, bedroom);

        assertEquals(51, result.score());
        assertEquals(51, result.totalPoints());
        assertEquals(0, result.breakdown().getFirst().points());
    }

    @Test
    void strongMismatchReturnsLowScore() {
        MatchInput student = new MatchInput(
            MatchInput.Schedule.EARLY_BIRD,
            MatchInput.Social.INTROVERT,
            MatchInput.Preference.LOW,
            MatchInput.Academic.CASUAL,
            MatchInput.Cleanliness.RELAXED,
            MatchInput.Preference.LOW
        );
        MatchInput bedroom = new MatchInput(
            MatchInput.Schedule.NIGHT_OWL,
            MatchInput.Social.EXTROVERT,
            MatchInput.Preference.HIGH,
            MatchInput.Academic.INTENSIVE,
            MatchInput.Cleanliness.STRICT,
            MatchInput.Preference.HIGH
        );

        MatchResult result = scorer.score(student, bedroom);

        assertEquals(0, result.score());
        assertEquals(0, result.totalPoints());
    }
}
