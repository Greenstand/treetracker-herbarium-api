CREATE TABLE organization_species
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    common_name_id uuid NOT NULL REFERENCES common_name(id),
    organization_id uuid NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    created_by uuid,
    active boolean NOT NULL DEFAULT true
);