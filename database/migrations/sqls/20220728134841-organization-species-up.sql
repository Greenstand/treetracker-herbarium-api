CREATE TABLE organization_species
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    common_name_id uuid NOT NULL REFERENCES species(id),
    organization_id uuid NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    created_by uuid NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE UNIQUE INDEX idx_organization_common_name
   ON organization_species (common_name_id, organization_id);