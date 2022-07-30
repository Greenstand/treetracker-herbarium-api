const OrganizationSpeciesRepository = require('../repositories/OrganizationSpeciesRepository');
const HttpError = require('../utils/HttpError');
const CommonName = require('./CommonName');

class OrganizationSpecies {
  constructor(session) {
    this._session = session;
    this._organizationSpeciesRepository = new OrganizationSpeciesRepository(
      session,
    );
  }

  async getOrganizationSpecies(filter, limitOptions) {
    const organizationSpecies =
      await this._organizationSpeciesRepository.getByFilter(
        filter,
        limitOptions,
      );

    const count = await this._organizationSpeciesRepository.countByFilter(
      filter,
    );

    return { organizationSpecies, count };
  }

  async deleteOrganizationSpecies(organizationSpeciesId) {
    return this._organizationSpeciesRepository.update({
      id: organizationSpeciesId,
      active: false,
    });
  }

  async getOrganizationSpeciesById(organizationSpeciesId) {
    const organizationSpecies =
      await this._organizationSpeciesRepository.getByFilter({
        'organization_species.id': organizationSpeciesId,
      });

    return organizationSpecies[0];
  }

  async createOrganizationSpecies(requestObject) {
    const { common_name, species_id, organization_id, created_by } =
      requestObject;

    const commonNameModel = new CommonName(this._session);

    const organizationSpecies =
      await this._organizationSpeciesRepository.getByFilter({
        or: [{ species_id }, { common_name }],
      });

    if (organizationSpecies.length) {
      throw new HttpError(
        400,
        'specified common name or species has already been specified for this organization',
      );
    }

    const createdCommonName = await commonNameModel.createCommonName({
      common_name,
      species_id,
    });

    return this._organizationSpeciesRepository.create({
      common_name_id: createdCommonName.id,
      organization_id,
      created_by,
    });
  }
}

module.exports = OrganizationSpecies;
