const Session = require('../infra/database/Session');
const Species = require('../models/Species');

class SpeciesService {
  constructor() {
    this._session = new Session();
    this._species = new Species(this._session);
  }

  async getSpecies(filter, limitOptions) {
    return this._species.getSpecies(filter, limitOptions);
  }

  async createSpecies(requestObject) {
    try {
      await this._session.beginTransaction();

      const result = await this._species.createSpecies(requestObject);

      await this._session.commitTransaction();
      return result;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async updateSpecies(requestObject) {
    try {
      await this._session.beginTransaction();

      const result = await this._species.updateSpecies(requestObject);

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

module.exports = SpeciesService;
