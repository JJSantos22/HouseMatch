DELETE FROM user_personality_trait
WHERE personality_trait_id IN (
  SELECT id FROM personality_trait
  WHERE category NOT IN ('SCHEDULE', 'SOCIAL', 'NOISE', 'ACADEMIC', 'CLEANLINESS', 'GUEST_FREQUENCY')
);

DELETE FROM personality_trait
WHERE category NOT IN ('SCHEDULE', 'SOCIAL', 'NOISE', 'ACADEMIC', 'CLEANLINESS', 'GUEST_FREQUENCY');

INSERT INTO personality_trait (category, level, description) VALUES
('SCHEDULE', 'EARLY_BIRD', 'prefers waking up early'),
('SCHEDULE', 'BALANCED', 'flexible schedule'),
('SCHEDULE', 'NIGHT_OWL', 'prefers staying up late'),
('SOCIAL', 'INTROVERT', 'prefers quiet, alone time'),
('SOCIAL', 'AMBIVERT', 'balanced, flexible'),
('SOCIAL', 'EXTROVERT', 'enjoys frequent social interaction'),
('NOISE', 'LOW', 'minimal noise, quiet environments'),
('NOISE', 'MEDIUM', 'balanced, some noise'),
('NOISE', 'HIGH', 'lively, noisy environments'),
('ACADEMIC', 'CASUAL', 'studies when needed, relaxed approach'),
('ACADEMIC', 'BALANCED', 'regular study routine, flexible'),
('ACADEMIC', 'INTENSIVE', 'highly focused, frequent studying'),
('CLEANLINESS', 'RELAXED', 'tolerates mess, cleans occasionally'),
('CLEANLINESS', 'MODERATE', 'keeps things reasonably tidy'),
('CLEANLINESS', 'STRICT', 'prefers everything clean and organized'),
('GUEST_FREQUENCY', 'LOW', 'prefers few guests, values privacy'),
('GUEST_FREQUENCY', 'MEDIUM', 'open to guests, occasional socializing'),
('GUEST_FREQUENCY', 'HIGH', 'enjoys having guests over frequently')
ON CONFLICT (category, level) DO UPDATE SET description = EXCLUDED.description;
