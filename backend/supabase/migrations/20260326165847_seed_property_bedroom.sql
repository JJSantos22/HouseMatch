-- Seed properties
INSERT INTO property (title, address, lat, lng, total_people, total_bedrooms, total_bathrooms, laundry, dishwasher, parking, ac, wifi, size_sqft, photos) VALUES
('Cozy Apartment in Baixa', 'Rua Augusta 10, Lisboa', 38.7223, -9.1393, 3, 2, 2, 'HOUSE', TRUE, FALSE, TRUE, TRUE, 850, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop']),
('Modern Flat in Alfama', 'Rua de São Miguel 25, Lisboa', 38.7369, -9.1428, 1, 1, 1, 'BUILDING', FALSE, TRUE, TRUE, TRUE, 450, ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop']),
('Spacious House in Belém', 'Rua de Belém 80, Lisboa', 38.7169, -9.1333, 6, 3, 2, 'HOUSE', TRUE, FALSE, FALSE, TRUE, 1200, ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop']),
('Central Flat in Chiado', 'Rua Garrett 45, Lisboa', 38.7282, -9.1501, 1, 1, 1, 'BUILDING', FALSE, TRUE, TRUE, TRUE, 500, ARRAY['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop']),
('Modern Studio in Parque das Nações', 'Av. Dom João II 30, Lisboa', 38.7156, -9.1478, 1, 1, 1, 'BUILDING', TRUE, TRUE, TRUE, TRUE, 400, ARRAY['https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop']);

-- Seed bedrooms
INSERT INTO bedroom (property_id, title, total_people, total_beds, price, size_sqft, furnished, private_bath, available_from_date, available_to_date, min_stay_months, photos, is_active)
SELECT id, 'Room A', 1, 1, 450, 120, TRUE, FALSE, DATE '2025-09-01', DATE '2026-08-31', 3, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Rua Augusta 10, Lisboa'
UNION ALL
SELECT id, 'Room B', 2, 2, 500, 150, TRUE, TRUE, DATE '2025-09-01', DATE '2026-08-31', 3, ARRAY['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Rua Augusta 10, Lisboa'
UNION ALL
SELECT id, 'Single Room', 1, 1, 380, 100, FALSE, FALSE, DATE '2025-10-01', DATE '2026-06-30', 3, ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Rua de São Miguel 25, Lisboa'
UNION ALL
SELECT id, 'Master Suite', 2, 1, 520, 180, TRUE, TRUE, DATE '2025-08-15', DATE '2026-07-31', 6, ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Rua de Belém 80, Lisboa'
UNION ALL
SELECT id, 'Double Room', 2, 2, 480, 130, TRUE, FALSE, DATE '2025-09-15', DATE '2026-08-31', 3, ARRAY['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Rua de Belém 80, Lisboa'
UNION ALL
SELECT id, 'Twin Room', 2, 2, 550, 140, TRUE, TRUE, DATE '2025-09-01', DATE '2026-08-31', 3, ARRAY['https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Rua de Belém 80, Lisboa'
UNION ALL
SELECT id, 'Cozy Room', 1, 1, 410, 110, TRUE, TRUE, DATE '2025-09-01', DATE '2026-08-31', 3, ARRAY['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Rua Garrett 45, Lisboa'
UNION ALL
SELECT id, 'Studio Room', 1, 1, 395, 105, TRUE, TRUE, DATE '2025-09-01', DATE '2026-08-31', 3, ARRAY['https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'], TRUE FROM property WHERE address = 'Av. Dom João II 30, Lisboa';

-- Seed property traits
INSERT INTO property_personality_trait (property_id, personality_trait_id)
SELECT p.id, pt.id
FROM (
  VALUES
    ('Rua Augusta 10, Lisboa', 'SCHEDULE', 'BALANCED'),
    ('Rua Augusta 10, Lisboa', 'SOCIAL', 'AMBIVERT'),
    ('Rua Augusta 10, Lisboa', 'NOISE', 'LOW'),
    ('Rua Augusta 10, Lisboa', 'ACADEMIC', 'BALANCED'),
    ('Rua Augusta 10, Lisboa', 'CLEANLINESS', 'MODERATE'),
    ('Rua Augusta 10, Lisboa', 'GUEST_FREQUENCY', 'MEDIUM'),

    ('Rua de São Miguel 25, Lisboa', 'SCHEDULE', 'BALANCED'),
    ('Rua de São Miguel 25, Lisboa', 'SOCIAL', 'INTROVERT'),
    ('Rua de São Miguel 25, Lisboa', 'NOISE', 'LOW'),
    ('Rua de São Miguel 25, Lisboa', 'ACADEMIC', 'INTENSIVE'),
    ('Rua de São Miguel 25, Lisboa', 'CLEANLINESS', 'MODERATE'),
    ('Rua de São Miguel 25, Lisboa', 'GUEST_FREQUENCY', 'LOW'),

    ('Rua de Belém 80, Lisboa', 'SCHEDULE', 'EARLY_BIRD'),
    ('Rua de Belém 80, Lisboa', 'SOCIAL', 'AMBIVERT'),
    ('Rua de Belém 80, Lisboa', 'NOISE', 'MEDIUM'),
    ('Rua de Belém 80, Lisboa', 'ACADEMIC', 'BALANCED'),
    ('Rua de Belém 80, Lisboa', 'CLEANLINESS', 'MODERATE'),
    ('Rua de Belém 80, Lisboa', 'GUEST_FREQUENCY', 'MEDIUM'),

    ('Rua Garrett 45, Lisboa', 'SCHEDULE', 'NIGHT_OWL'),
    ('Rua Garrett 45, Lisboa', 'SOCIAL', 'INTROVERT'),
    ('Rua Garrett 45, Lisboa', 'NOISE', 'LOW'),
    ('Rua Garrett 45, Lisboa', 'ACADEMIC', 'INTENSIVE'),
    ('Rua Garrett 45, Lisboa', 'CLEANLINESS', 'STRICT'),
    ('Rua Garrett 45, Lisboa', 'GUEST_FREQUENCY', 'LOW'),

    ('Av. Dom João II 30, Lisboa', 'SCHEDULE', 'BALANCED'),
    ('Av. Dom João II 30, Lisboa', 'SOCIAL', 'AMBIVERT'),
    ('Av. Dom João II 30, Lisboa', 'NOISE', 'LOW'),
    ('Av. Dom João II 30, Lisboa', 'ACADEMIC', 'BALANCED'),
    ('Av. Dom João II 30, Lisboa', 'CLEANLINESS', 'MODERATE'),
    ('Av. Dom João II 30, Lisboa', 'GUEST_FREQUENCY', 'LOW')
) AS seed(address, category, level)
JOIN property p ON p.address = seed.address
JOIN personality_trait pt
  ON pt.category = seed.category
 AND pt.level = seed.level
ON CONFLICT DO NOTHING;
