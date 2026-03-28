CREATE TABLE IF NOT EXISTS property_personality_trait (
  property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  personality_trait_id UUID NOT NULL REFERENCES personality_trait(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, personality_trait_id)
);
