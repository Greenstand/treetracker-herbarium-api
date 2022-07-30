const CommonNameRepository = require('../repositories/CommonNameRepository');
const HttpError = require('../utils/HttpError');

class CommonName {
  constructor(session) {
    this._commonNameRepository = new CommonNameRepository(session);
  }

  async getCommonNames(filter, limitOptions) {
    return this._commonNameRepository.getByFilter(filter, limitOptions);
  }

  async createCommonName(requestObject, toErrorOut) {
    const { species_id, common_name, created_by } = requestObject;

    const getExistingCommonName = await this.getCommonNames({
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
}

module.exports = CommonName;
