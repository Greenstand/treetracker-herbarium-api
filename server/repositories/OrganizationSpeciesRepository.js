const BaseRepository = require('./BaseRepository');

class OrganizationSpeciesRepository extends BaseRepository {
  constructor(session) {
    super('organization_species', session);
  }

  static generateFilter(filter) {
    return Object.keys(filter).length
      ? {
          and: [{ 'organization_species.active': true }, { ...filter }],
        }
      : { 'organization_species.active': true };
  }

  async getByFilter(filter, limitOptions) {
    let promise = this._session
      .getDB()
      .select(
        `${this._tableName}.id as id`,
        'common_name.common_name',
        'common_name.species_id',
        `${this._tableName}.created_at`,
        `${this._tableName}.updated_at`,
        `${this._tableName}.created_by`,
      )
      .from(this._tableName)
      .join(
        'common_name',
        `${this._tableName}.common_name_id`,
        '=',
        'common_name.id',
      )
      .where((builder) =>
        this.whereBuilder(this.constructor.generateFilter(filter), builder),
      );

    if (limitOptions && limitOptions.limit) {
      promise = promise.limit(limitOptions.limit);
    }

    if (limitOptions && limitOptions.offset) {
      promise = promise.offset(limitOptions.offset);
    }

    return promise;
  }

  async countByFilter(filter) {
    const result = await this._session
      .getDB()
      .count()
      .table(this._tableName)
      .join(
        'common_name',
        `${this._tableName}.common_name_id`,
        '=',
        'common_name.id',
      )
      .where((builder) =>
        this.whereBuilder(this.constructor.generateFilter(filter), builder),
      );

    return +result[0].count;
  }
}

module.exports = OrganizationSpeciesRepository;
