package com.tecstorm.housematch.ai;

final class TraitCompatibilityRules {
    private TraitCompatibilityRules() {}

    static <E extends Enum<E>> int scoreLinear(E student, E bedroom, int weight) {
        if (student == null || bedroom == null) {
            return 0;
        }

        int distance = Math.abs(student.ordinal() - bedroom.ordinal());
        if (distance == 0) {
            return weight;
        }
        if (distance == 1) {
            return Math.round(weight * 0.6f);
        }
        return 0;
    }

    static int scoreDistanceKm(double distanceKm, int weight) {
        if (distanceKm <= 1.0d) {
            return weight;
        }
        if (distanceKm <= 3.0d) {
            return Math.round(weight * 0.8f);
        }
        if (distanceKm <= 7.0d) {
            return Math.round(weight * 0.6f);
        }
        if (distanceKm <= 12.0d) {
            return Math.round(weight * 0.35f);
        }
        return Math.round(weight * 0.1f);
    }
}
