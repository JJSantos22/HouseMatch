CREATE TABLE student_favorite (
    student_id UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE,
    bedroom_id UUID NOT NULL REFERENCES bedroom(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (student_id, bedroom_id)
);
