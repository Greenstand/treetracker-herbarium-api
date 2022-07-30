const SpeciesRepository = require('../repositories/SpeciesRepository');
const HttpError = require('../utils/HttpError');

class Species {
  constructor(session) {
    this._speciesRepository = new SpeciesRepository(session);
  }

  async getSpecies(filter, limitOptions) {
    const species = await this._speciesRepository.getByFilter(
      filter,
      limitOptions,
    );
    const count = await this._speciesRepository.countByFilter(filter);

    return { species, count };
  }

  async createSpecies(requestObject) {
    const species = await this._speciesRepository.getByFilter({
      scientific_name: requestObject.scientific_name,
    });

    if (species.length) {
      throw new HttpError(400, 'Scientific name already exists');
    }

    return this._speciesRepository.create(requestObject);
  }

  async updateSpecies(requestObject) {
    return this._speciesRepository.update({
      ...requestObject,
      updated_at: new Date().toISOString(),
    });
  }
}

module.exports = Species;
