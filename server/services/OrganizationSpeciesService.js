const Session = require('../infra/database/Session');
const OrganizationSpecies = require('../models/OrganizationSpecies');

class OrganizationSpeciesService {
  constructor() {
    this._session = new Session();
    this._organizationSpecies = new OrganizationSpecies(this._session);
  }

  async getOrganizationSpecies(filter, limitOptions) {
    return this._organizationSpecies.getOrganizationSpecies(
      filter,
      limitOptions,
    );
  }

  async getOrganizationSpeciesById(organizationSpeciesId) {
    return this._organizationSpecies.getOrganizationSpeciesById(
      organizationSpeciesId,
    );
  }

  async deleteOrganizationSpecies(organizationsSpeciesId) {
    try {
      await this._session.beginTransaction();

      const result = await this._organizationSpecies.deleteOrganizationSpecies(
        organizationsSpeciesId,
      );

      await this._session.commitTransaction();
      return result;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async createOrganizationSpecies(requestObject) {
    try {
      await this._session.beginTransaction();

      const result = await this._organizationSpecies.createOrganizationSpecies(
        requestObject,
      );

      await this._session.commitTransaction();
      return result;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        this._session.rollbackTransaction();
      }
      throw e;
    }
  }
}

module.exports = OrganizationSpeciesService;
