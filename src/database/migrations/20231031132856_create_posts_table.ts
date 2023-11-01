import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', tbl => {
    tbl.increments('id').primary();
    tbl.string('title').notNullable();
    tbl.text('content').notNullable();
    tbl.integer('user_id').unsigned().references('id').inTable('users');
    tbl.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('posts');
}