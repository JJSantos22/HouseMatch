INSERT INTO review (property_id, student_id, rating, comment)
SELECT p.id, s.id, 4.5, 'Great location and very clean!'
FROM property p, student s
JOIN profile pr ON s.profile_id = pr.id
WHERE p.address = 'Rua Augusta 10, Lisboa' AND pr.email = 'student@test.com';

INSERT INTO review (property_id, student_id, rating, comment)
SELECT p.id, s.id, 4, 'Cozy place, friendly neighbors'
FROM property p, student s
JOIN profile pr ON s.profile_id = pr.id
WHERE p.address = 'Rua de São Miguel 25, Lisboa' AND pr.email = 'student@test.com';
