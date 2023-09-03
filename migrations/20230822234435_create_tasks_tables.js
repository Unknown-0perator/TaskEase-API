exports.up = function (knex) {
    return knex.schema 
        .createTable('tasks', (table)=>{
            table.uuid('task_id').primary();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.integer('budget').notNullable().defaultTo(0);
            table.string('type').notNullable();
            table.integer('latitude').notNullable();
            table.integer('longitude').notNullable();
            table.string('status').notNullable();
            table.date('date');
            table.time('time');
            table.boolean('flexible').defaultTo('false')
            table.uuid('poster_id').references('users.user_id').onUpdate('CASCADE')
            .onDelete('CASCADE').notNullable();
            table.uuid('helper_id').references('users.user_id').onUpdate('CASCADE')
            .onDelete('CASCADE');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
}


exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
}