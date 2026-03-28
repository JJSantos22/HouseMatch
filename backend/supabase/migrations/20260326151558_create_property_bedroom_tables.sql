
CREATE TABLE property (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    total_people INT NOT NULL,
    total_bedrooms INT NOT NULL,
    total_bathrooms INT NOT NULL,
    laundry TEXT CHECK (laundry IN ('BUILDING', 'HOUSE', 'NONE')),
    dishwasher BOOLEAN NOT NULL DEFAULT FALSE,
    parking BOOLEAN NOT NULL DEFAULT FALSE,
    ac BOOLEAN NOT NULL DEFAULT FALSE,
    wifi BOOLEAN NOT NULL DEFAULT FALSE,
    size_sqft INT,
    photos TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bedroom (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    total_people INT NOT NULL,
    total_beds INT NOT NULL,
    price INT NOT NULL,
    size_sqft INT,
    furnished BOOLEAN NOT NULL DEFAULT FALSE,
    private_bath BOOLEAN NOT NULL DEFAULT FALSE,
    available_from_date DATE NOT NULL,
    available_to_date DATE NOT NULL,
    min_stay_months INT NOT NULL,
    photos TEXT[],
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
