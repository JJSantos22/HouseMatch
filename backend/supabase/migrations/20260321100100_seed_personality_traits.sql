ALTER TABLE personality_trait ADD COLUMN description TEXT;

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

('CLEANLINESS', 'RELAXED', 'tolerates mess, cleans occasionally'),
('CLEANLINESS', 'MODERATE', 'keeps things reasonably tidy'),
('CLEANLINESS', 'STRICT', 'prefers everything clean and organized'),

('ACADEMIC', 'CASUAL', 'studies when needed, relaxed approach'),
('ACADEMIC', 'BALANCED', 'regular study routine, flexible'),
('ACADEMIC', 'INTENSIVE', 'highly focused, frequent studying'),

('GUEST_FREQUENCY', 'LOW', 'prefers few guests, values privacy'),
('GUEST_FREQUENCY', 'MEDIUM', 'open to guests, occasional socializing'),
('GUEST_FREQUENCY', 'HIGH', 'enjoys having guests over frequently');
/* 
('PRIORITY', 'FITNESS_FOCUSED', 'prioritizes fitness and health'),
('PRIORITY', 'HUSTLE_MODE', 'focused on work and career goals'),
('PRIORITY', 'PARTY_DRIVEN', 'enjoys nightlife and social events'),
('PRIORITY', 'ERASMUS_MODE', 'focused on the exchange experience');
 */