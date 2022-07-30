CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE species
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    scientific_name varchar NOT NULL,
    description varchar NOT NULL,
    morphology varchar NOT NULL,
    range geometry(MultiPolygon, 4326),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_scientific_name
   ON species (lower(scientific_name));