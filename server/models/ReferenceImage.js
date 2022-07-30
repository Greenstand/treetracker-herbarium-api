const ReferenceImageRepository = require('../repositories/ReferenceImageRepository');

class ReferenceImage {
  constructor(session) {
    this._referenceImageRepository = new ReferenceImageRepository(session);
  }

  async getReferenceImages(filterCriteria, limitOptions) {
    const filter = { ...filterCriteria, active: true };
    const referenceImages = await this._referenceImageRepository.getByFilter(
      filter,
      limitOptions,
    );

    const count = await this._referenceImageRepository.countByFilter(filter);

    return { referenceImages, count };
  }

  async deleteReferenceImage(referenceImageId) {
    return this._referenceImageRepository.update({
      id: referenceImageId,
      active: false,
      updated_at: new Date().toISOString(),
    });
  }

  async getReferenceImageById(referenceImageId) {
    const referenceImage = await this.getReferenceImages({
      id: referenceImageId,
    });

    return referenceImage[0];
  }

  async createReferenceImage(requestObject) {
    return this._referenceImageRepository.create(requestObject);
  }
}

module.exports = ReferenceImage;
