package com.tecstorm.housematch.ai;

public record MatchInput(
    MatchInput.Schedule schedule,
    MatchInput.Social social,
    MatchInput.Preference noise,
    MatchInput.Academic academic,
    MatchInput.Cleanliness cleanliness,
    MatchInput.Preference guestFrequency
) {
    public enum Schedule {
        EARLY_BIRD,
        BALANCED,
        NIGHT_OWL
    }

    public enum Social {
        INTROVERT,
        AMBIVERT,
        EXTROVERT
    }

    public enum Preference {
        LOW,
        MEDIUM,
        HIGH
    }

    public enum Academic {
        CASUAL,
        BALANCED,
        INTENSIVE
    }

    public enum Cleanliness {
        RELAXED,
        MODERATE,
        STRICT
    }
}
