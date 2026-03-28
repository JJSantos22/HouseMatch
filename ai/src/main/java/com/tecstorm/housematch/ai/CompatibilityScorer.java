package com.tecstorm.housematch.ai;

import java.util.List;

public class CompatibilityScorer {
    private final CompatibilityWeights weights;

    public CompatibilityScorer() {
        this(CompatibilityWeights.defaults());
    }

    public CompatibilityScorer(CompatibilityWeights weights) {
        this.weights = weights;
    }

    public MatchResult score(MatchInput student, MatchInput bedroom) {
        TraitScore schedule = traitScore(
            "schedule",
            student.schedule(),
            bedroom.schedule(),
            weights.schedule(),
            TraitCompatibilityRules.scoreLinear(student.schedule(), bedroom.schedule(), weights.schedule())
        );
        TraitScore social = traitScore(
            "social",
            student.social(),
            bedroom.social(),
            weights.social(),
            TraitCompatibilityRules.scoreLinear(student.social(), bedroom.social(), weights.social())
        );
        TraitScore noise = traitScore(
            "noise",
            student.noise(),
            bedroom.noise(),
            weights.noise(),
            TraitCompatibilityRules.scoreLinear(student.noise(), bedroom.noise(), weights.noise())
        );
        TraitScore academic = traitScore(
            "academic",
            student.academic(),
            bedroom.academic(),
            weights.academic(),
            TraitCompatibilityRules.scoreLinear(student.academic(), bedroom.academic(), weights.academic())
        );
        TraitScore cleanliness = traitScore(
            "cleanliness",
            student.cleanliness(),
            bedroom.cleanliness(),
            weights.cleanliness(),
            TraitCompatibilityRules.scoreLinear(student.cleanliness(), bedroom.cleanliness(), weights.cleanliness())
        );
        TraitScore guestFrequency = traitScore(
            "guest_frequency",
            student.guestFrequency(),
            bedroom.guestFrequency(),
            weights.guestFrequency(),
            TraitCompatibilityRules.scoreLinear(student.guestFrequency(), bedroom.guestFrequency(), weights.guestFrequency())
        );

        List<TraitScore> breakdown = List.of(schedule, social, noise, academic, cleanliness, guestFrequency);
        int totalPoints = breakdown.stream().mapToInt(TraitScore::points).sum();
        int maxPoints = breakdown.stream().mapToInt(TraitScore::weight).sum();
        int score = maxPoints == 0 ? 0 : Math.round(totalPoints * 100f / maxPoints);
        return new MatchResult(score, totalPoints, maxPoints, breakdown);
    }

    private TraitScore traitScore(String trait, Enum<?> studentValue, Enum<?> bedroomValue, int weight, int points) {
        int score = weight == 0 ? 0 : Math.round(points * 100f / weight);
        return new TraitScore(
            trait,
            studentValue == null ? null : studentValue.name(),
            bedroomValue == null ? null : bedroomValue.name(),
            weight,
            points,
            score
        );
    }
}
