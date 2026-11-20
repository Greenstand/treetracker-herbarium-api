ALTER TABLE herbarium.species
    ADD COLUMN is_hidden boolean NOT NULL DEFAULT false,
    ADD COLUMN is_default boolean NOT NULL DEFAULT true,
    ADD COLUMN reference_url text;
COMMENT ON COLUMN herbarium.species.is_default IS
    'Species included when no project or organization selection exists. Added through Admin Panel domain integration.';
COMMENT ON COLUMN herbarium.species.is_hidden IS
    'Hidden from new selections while retaining historical capture references.';
