INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, instance_id, aud, role)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'student@test.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'landlord@test.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');

INSERT INTO profile (id, name, role) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'John Student', 'student'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Jane Landlord', 'landlord');

INSERT INTO student (profile_id, university) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'University of Lisbon');

INSERT INTO landlord (profile_id, phone, email) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', '+351912345678', 'jane@example.com');
