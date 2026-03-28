CREATE TABLE review (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE,
    rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE review_personality_trait (
    review_id UUID NOT NULL REFERENCES review(id) ON DELETE CASCADE,
    personality_trait_id UUID NOT NULL REFERENCES personality_trait(id) ON DELETE CASCADE,
    PRIMARY KEY (review_id, personality_trait_id)
);
