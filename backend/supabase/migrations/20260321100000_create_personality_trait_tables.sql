CREATE TABLE personality_trait (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,
  level VARCHAR(50) NOT NULL,
  UNIQUE(category, level)
);

CREATE TABLE user_personality_trait (
  student_id UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE,
  personality_trait_id UUID NOT NULL REFERENCES personality_trait(id) ON DELETE CASCADE,
  PRIMARY KEY (student_id, personality_trait_id)
);
