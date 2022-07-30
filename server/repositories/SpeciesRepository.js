const BaseRepository = require('./BaseRepository');

class SpeciesRepository extends BaseRepository {
  constructor(session) {
    super('species', session);
  }
}

module.exports = SpeciesRepository;
