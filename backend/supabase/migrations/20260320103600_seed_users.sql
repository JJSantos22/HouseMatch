INSERT INTO profile (id, email, password, name, role) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'student@test.com', 'password123', 'John Student', 'student'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'landlord@test.com', 'password123', 'Jane Landlord', 'landlord');

INSERT INTO student (profile_id, university) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'University of Lisbon');

INSERT INTO landlord (profile_id, phone) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', '+351912345678');
