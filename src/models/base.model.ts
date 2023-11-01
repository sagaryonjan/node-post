import { Knex } from 'knex';
const knexFile = require("../../knexfile");

import config from '../core/config';

const knex = require('knex')(knexFile);

class BaseModel {
  public static table: string;

  static all(): Knex.QueryBuilder {
    return this.query().select();
  }

  static insert(attributes: object | Array<object>): Knex.QueryBuilder {
    return this.query().insert(attributes);
  }

  static findById(id: number): Knex.QueryBuilder {
    return this.query().where('id', id).first();
  }

  static findOne(query: object): Knex.QueryBuilder {
    return this.query().where(query).first();
  }

  static deleteById(id: number): Knex.QueryBuilder {
    return this.query().where('id', id).del();
  }

  static update(query: object, attributes: object) {
    return this.query().where(query).update(attributes);
  }

  static query(): Knex.QueryBuilder {
    return knex(this.table);
  }
}

export default BaseModel;