import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id').primary();
    tbl.string('email').notNullable().unique();
    tbl.string('full_name');
    tbl.string('password').notNullable();
    tbl.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}