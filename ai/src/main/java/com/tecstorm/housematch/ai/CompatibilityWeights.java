package com.tecstorm.housematch.ai;

public record CompatibilityWeights(
    int schedule,
    int social,
    int noise,
    int academic,
    int cleanliness,
    int guestFrequency
) {
    public static CompatibilityWeights defaults() {
        return new CompatibilityWeights(15, 20, 15, 10, 20, 20);
    }
}
