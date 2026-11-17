CREATE TABLE herbarium.species_selection (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id uuid NOT NULL,
    project_id text,
    species_id uuid NOT NULL REFERENCES herbarium.species(id),
    local_name text,
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT species_selection_project_id_check
        CHECK (project_id IS NULL OR (project_id <> '' AND project_id = btrim(project_id))),
    CONSTRAINT species_selection_local_name_check
        CHECK (local_name IS NULL OR (local_name <> '' AND local_name = btrim(local_name)))
);

CREATE UNIQUE INDEX species_selection_organization_species_idx
    ON herbarium.species_selection (organization_id, species_id)
    WHERE project_id IS NULL;

CREATE UNIQUE INDEX species_selection_project_species_idx
    ON herbarium.species_selection (organization_id, project_id, species_id)
    WHERE project_id IS NOT NULL;

CREATE INDEX species_selection_species_id_idx
    ON herbarium.species_selection (species_id);
