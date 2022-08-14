const BaseRepository = require('./BaseRepository');

class CommonNameRepository extends BaseRepository {
  constructor(session) {
    super('common_name', session);
  }
}

module.exports = CommonNameRepository;
