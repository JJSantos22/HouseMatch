CREATE TABLE IF NOT EXISTS roommate_profiles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_name VARCHAR(100) NOT NULL,
    cleanliness TINYINT UNSIGNED NOT NULL CHECK (cleanliness BETWEEN 1 AND 5),
    noise_level TINYINT UNSIGNED NOT NULL CHECK (noise_level BETWEEN 1 AND 5),
    guest_frequency TINYINT UNSIGNED NOT NULL CHECK (guest_frequency BETWEEN 1 AND 5),
    daily_schedule ENUM('EARLY_BIRD', 'BALANCED', 'NIGHT_OWL') NOT NULL,
    social_interaction ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    notes VARCHAR(255),
    embedding VECTOR(5)
) ENGINE=InnoDB;

INSERT INTO roommate_profiles (
    profile_name,
    cleanliness,
    noise_level,
    guest_frequency,
    daily_schedule,
    social_interaction,
    notes
) VALUES
    ('Sofia', 5, 1, 1, 'EARLY_BIRD', 'LOW', 'Quiet and organized, sleeps early'),
    ('Miguel', 3, 3, 4, 'BALANCED', 'HIGH', 'Friendly, hosts friends on weekends'),
    ('Ines', 4, 2, 2, 'EARLY_BIRD', 'MEDIUM', 'Structured weekdays, moderate social life'),
    ('Rui', 2, 5, 5, 'NIGHT_OWL', 'HIGH', 'Late schedule and very social'),
    ('Carla', 5, 2, 1, 'BALANCED', 'LOW', 'Clean and calm home preference'),
    ('Tiago', 3, 4, 3, 'NIGHT_OWL', 'MEDIUM', 'Night-focused routine, balanced socializing'),
    ('Ana', 4, 1, 2, 'EARLY_BIRD', 'LOW', 'Low-noise and tidy habits'),
    ('Pedro', 2, 4, 4, 'BALANCED', 'HIGH', 'Relaxed cleaning standards, outgoing'),
    ('Beatriz', 5, 2, 3, 'BALANCED', 'MEDIUM', 'Very clean, social in moderation'),
    ('Joao', 3, 3, 1, 'NIGHT_OWL', 'LOW', 'Independent and low guest frequency');
