import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('diets', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').references('id').inTable('users')
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.boolean('completed').notNullable()
    table.string('day_hour').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('active').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('diets')
}
