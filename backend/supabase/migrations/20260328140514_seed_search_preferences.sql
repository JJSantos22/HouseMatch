INSERT INTO search_preference (student_id, min_price, max_price, min_stay_months, available_from, furnished, private_bath, private_room, max_roommates, max_bedrooms, wifi, center_lat, center_lng, radius_km)
SELECT id, 300, 600, 3, DATE '2025-09-01', TRUE, FALSE, FALSE, 4, 3, TRUE, 38.7223, -9.1393, 10
FROM student
WHERE id NOT IN (SELECT student_id FROM search_preference);
