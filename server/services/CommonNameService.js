const Session = require('../infra/database/Session');
const CommonName = require('../models/CommonName');

class CommonNameService {
  constructor() {
    this._session = new Session();
    this._commonName = new CommonName(this._session);
  }

  async getCommonNames(filter, limitOptions) {
    return this._commonName.getCommonNames(filter, limitOptions);
  }

  async getCommonNameById(commonNameId) {
    return this._commonName.getCommonNameById(commonNameId);
  }

  async deleteCommonName(commonNameId) {
    try {
      await this._session.beginTransaction();

      const result = await this._commonName.deleteCommonName(commonNameId);

      await this._session.commitTransaction();
      return result;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async createCommonName(requestObject) {
    try {
      await this._session.beginTransaction();

      const result = await this._commonName.createCommonName(
        requestObject,
        true,
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

module.exports = CommonNameService;
