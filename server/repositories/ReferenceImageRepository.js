const BaseRepository = require('./BaseRepository');

class ReferenceImageRepository extends BaseRepository {
  constructor(session) {
    super('reference_image', session);
  }
}

module.exports = ReferenceImageRepository;
