const CommonNameRepository = require('../repositories/CommonNameRepository');
const OrganizationSpeciesRepository = require('../repositories/OrganizationSpeciesRepository');
const HttpError = require('../utils/HttpError');

class CommonName {
  constructor(session) {
    this._session = session;
    this._commonNameRepository = new CommonNameRepository(session);
  }

  async getCommonNames(filter, limitOptions) {
    const commonNames = await this._commonNameRepository.getByFilter(
      filter,
      limitOptions,
    );
    const count = await this._commonNameRepository.countByFilter(filter);

    return { commonNames, count };
  }

  async createCommonName(requestObject, toErrorOut) {
    const { species_id, common_name, created_by } = requestObject;

    const getExistingCommonName = await this._commonNameRepository.getByFilter({
      species_id,
      common_name,
    });

    if (getExistingCommonName.length) {
      if (toErrorOut)
        throw new HttpError(
          400,
          'The specified common name already exists for the specified species',
        );

      return getExistingCommonName[0];
    }

    const createdCommonName = await this._commonNameRepository.create({
      species_id,
      common_name,
      created_by,
    });

    return createdCommonName;
  }

  async deleteCommonName(commonNameId) {
    // cannot access the model due to a circular dependency
    const organizationSpeciesRepository = new OrganizationSpeciesRepository(
      this._session,
    );
    const organizationSpecies = await organizationSpeciesRepository.getByFilter(
      { common_name_id: commonNameId },
    );

    if (organizationSpecies.length) {
      throw new HttpError(
        400,
        `common name is currently in use by one or more organizations`,
      );
    }

    return this._commonNameRepository.update({
      id: commonNameId,
      active: false,
      updated_at: new Date().toISOString(),
    });
  }

  async getCommonNameById(commonNameId) {
    return this._commonNameRepository.getById(commonNameId);
  }
}

module.exports = CommonName;
