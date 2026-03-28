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
}
