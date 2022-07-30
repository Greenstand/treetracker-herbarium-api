const Session = require('../infra/database/Session');
const ReferenceImage = require('../models/ReferenceImage');

class ReferenceImageService {
  constructor() {
    this._session = new Session();
    this._referenceImage = new ReferenceImage(this._session);
  }

  async getReferenceImages(filter, limitOptions) {
    return this._referenceImage.getReferenceImages(filter, limitOptions);
  }

  async getReferenceImageById(referenceImageId) {
    return this._referenceImage.getReferenceImageById(referenceImageId);
  }

  async deleteReferenceImage(referenceImageId) {
    try {
      await this._session.beginTransaction();

      const result = await this._referenceImage.deleteReferenceImage(
        referenceImageId,
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

  async createReferenceImage(requestObject) {
    try {
      await this._session.beginTransaction();

      const result = await this._referenceImage.createReferenceImage(
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

module.exports = ReferenceImageService;
