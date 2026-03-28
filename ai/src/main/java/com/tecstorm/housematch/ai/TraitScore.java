package com.tecstorm.housematch.ai;

public record TraitScore(
    String trait,
    String studentValue,
    String bedroomValue,
    int weight,
    int points,
    int score
) {}
