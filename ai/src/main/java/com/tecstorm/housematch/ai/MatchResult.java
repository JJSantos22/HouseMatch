package com.tecstorm.housematch.ai;

import java.util.List;

public record MatchResult(
    int score,
    int totalPoints,
    int maxPoints,
    List<TraitScore> breakdown
) {}
