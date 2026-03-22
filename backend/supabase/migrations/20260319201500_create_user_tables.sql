CREATE TYPE user_role AS ENUM ('student', 'landlord');

CREATE TABLE profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE student (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID UNIQUE NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  university TEXT
);

CREATE TABLE landlord (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID UNIQUE NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  phone TEXT,
  email TEXT
);
