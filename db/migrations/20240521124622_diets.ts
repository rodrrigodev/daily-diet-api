import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('diets', (table) => {
    table.uuid('id').primary()
    table.foreign('user_id').references('users.id')
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('active').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('diets')
}
