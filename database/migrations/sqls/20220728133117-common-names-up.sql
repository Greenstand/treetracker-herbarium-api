CREATE TABLE common_names
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    species_id uuid NOT NULL REFERENCES species(id),
    common_name varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    created_by uuid NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE UNIQUE INDEX idx_species_common_name
   ON common_names (lower(common_name), species_id);