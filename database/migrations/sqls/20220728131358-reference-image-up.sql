CREATE TABLE reference_image
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    species_id uuid NOT NULL REFERENCES species(id),
    url varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    active boolean NOT NULL DEFAULT true
);