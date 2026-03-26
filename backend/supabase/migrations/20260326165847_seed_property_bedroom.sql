-- Seed properties
INSERT INTO property (title, address, lat, lng, total_bathrooms, laundry, dishwasher, parking, ac, wifi, photos) VALUES
('Cozy Apartment in Baixa', 'Rua Augusta 10, Lisboa', 38.7103, -9.1365, 2, 'HOUSE', TRUE, FALSE, TRUE, TRUE, ARRAY['https://example.com/p1_1.jpg']),
('Modern Flat on Liberdade', 'Av. da Liberdade 50, Lisboa', 38.7196, -9.1423, 1, 'BUILDING', FALSE, TRUE, TRUE, TRUE, ARRAY['https://example.com/p2_1.jpg']),
('Student House in Porto', 'Rua de Santa Catarina 100, Porto', 41.1496, -8.6109, 2, 'HOUSE', TRUE, FALSE, FALSE, TRUE, ARRAY['https://example.com/p3_1.jpg']);

-- Seed bedrooms
INSERT INTO bedroom (property_id, title, total_people, total_beds, available_beds, price, size_sqft, furnished, private_bath, available_from_date, available_to_date, min_stay_months, photos, is_active)
SELECT id, 'Room A', 1, 1, 1, 450, 120, TRUE, FALSE, DATE '2025-09-01', DATE '2026-08-31', 3, ARRAY['https://example.com/b1_1.jpg'], TRUE FROM property WHERE address = 'Rua Augusta 10, Lisboa'
UNION ALL
SELECT id, 'Room B', 2, 2, 1, 500, 150, TRUE, TRUE, DATE '2025-09-01', DATE '2026-08-31', 3, ARRAY['https://example.com/b2_1.jpg'], TRUE FROM property WHERE address = 'Rua Augusta 10, Lisboa'
UNION ALL
SELECT id, 'Master Suite', 2, 1, 1, 650, 180, TRUE, TRUE, DATE '2025-08-15', DATE '2026-07-31', 6, ARRAY['https://example.com/b3_1.jpg'], TRUE FROM property WHERE address = 'Av. da Liberdade 50, Lisboa'
UNION ALL
SELECT id, 'Single Room', 1, 1, 1, 380, 100, FALSE, FALSE, DATE '2025-10-01', DATE '2026-06-30', 3, ARRAY['https://example.com/b4_1.jpg'], TRUE FROM property WHERE address = 'Rua de Santa Catarina 100, Porto'
UNION ALL
SELECT id, 'Double Room', 2, 2, 2, 420, 130, TRUE, FALSE, DATE '2025-09-15', DATE '2026-08-31', 3, ARRAY['https://example.com/b5_1.jpg'], TRUE FROM property WHERE address = 'Rua de Santa Catarina 100, Porto';
