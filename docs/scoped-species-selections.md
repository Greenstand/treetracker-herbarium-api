# Realm and project species selections

A realm is assumed to be the organization scope shared by its members, identified by the same UUID used by `herbarium.organization_species.organization_id`. Project IDs are opaque text until the project service's identity contract is confirmed. The API must resolve the project under the authenticated organization before reading or writing a project selection.

`herbarium.species_selection` references the Herbarium catalog UUID. A null `project_id` makes the row part of the organization-wide selection. An optional `local_name` applies only to that row. It does not change the canonical scientific name or the existing common-name records. A species can appear once in each scope.

## Effective list

1. Use the project's saved selection when it has entries.
2. Otherwise use the organization's saved selection when it has entries.
3. If neither exists, preserve any source of organization-specific defaults used by the calling workflow. Where active legacy `organization_species` rows represent that list, read those rows through their active `common_name` records and deduplicate by species ID. Otherwise return the workflow's existing default catalog.

On each returned row, prefer its scoped local name, then an available catalog name, then the scientific name. Zero saved rows means inherit. An explicitly empty list would require a separate setting. The default list is resolved by the application and is not copied into each organization.

## Rollout

The migration adds the table and leaves existing data in place. It does not backfill legacy organization names. Before switching an existing client, verify which legacy rows it uses as selections and how it resolves multiple active names for the same species. Preserve that behavior until the organization saves a new selection. The API should replace a scope's list in one transaction and enforce organization and project permissions on the server. Existing API consumers can continue using the legacy tables.

Validate the realm and project identity assumptions before deploying. Confirm the intended default catalog and identifier mapping for any legacy capture-verification consumers before connecting their UI. The down migration removes all selections stored in the new table.
