CREATE OR REPLACE TABLE roommate_profiles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_name VARCHAR(100) NOT NULL,
    cleanliness TINYINT UNSIGNED NOT NULL,
    noise_level TINYINT UNSIGNED NOT NULL,
    guest_frequency TINYINT UNSIGNED NOT NULL,
    daily_schedule ENUM('EARLY_BIRD', 'BALANCED', 'NIGHT_OWL') NOT NULL,
    social_interaction ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    embedding VECTOR(5) NOT NULL DEFAULT 0,
    VECTOR INDEX embedding_idx (embedding)
);

INSERT INTO roommate_profiles (
    profile_name,
    cleanliness,
    noise_level,
    guest_frequency,
    daily_schedule,
    social_interaction,
    embedding
) VALUES
    ('Sofia', 5, 1, 1, 'EARLY_BIRD', 'LOW', VEC_FromText('[1.00, 0.00, 0.00, 0.00, 0.00]')),
    ('Miguel', 3, 3, 4, 'BALANCED', 'HIGH', VEC_FromText('[0.50, 0.50, 0.75, 0.50, 1.00]')),
    ('Ines', 4, 2, 2, 'EARLY_BIRD', 'MEDIUM', VEC_FromText('[0.75, 0.25, 0.25, 0.00, 0.50]')),
    ('Rui', 2, 5, 5, 'NIGHT_OWL', 'HIGH', VEC_FromText('[0.25, 1.00, 1.00, 1.00, 1.00]')),
    ('Carla', 5, 2, 1, 'BALANCED', 'LOW', VEC_FromText('[1.00, 0.25, 0.00, 0.50, 0.00]'));

-- Search example using the same 5 parameters:
-- cleanliness=4, noise_level=2, guest_frequency=2, daily_schedule=EARLY_BIRD, social_interaction=MEDIUM
SELECT
    profile_name,
    cleanliness,
    noise_level,
    guest_frequency,
    daily_schedule,
    social_interaction,
    VEC_DISTANCE_COSINE(embedding, VEC_FromText('[0.75, 0.25, 0.25, 0.00, 0.50]')) AS distance
FROM roommate_profiles
ORDER BY distance
LIMIT 3;
