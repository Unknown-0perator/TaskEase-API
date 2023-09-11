exports.up = function (knex) {
    return knex.schema 
        .createTable('offers', (table) => {
            table.uuid('offer_id').primary();
            table.integer('offer_amount').notNullable();
            table.string('timestamp');
            table.uuid('task_id').references('tasks.task_id').onUpdate('CASCADE')
            .onDelete('CASCADE').notNullable();
            table.uuid('user_id').references('users.user_id').onUpdate('CASCADE')
            .onDelete('CASCADE').notNullable();
        })
}


exports.down = function (knex) {
    return knex.schema.dropTable('offers');
}
