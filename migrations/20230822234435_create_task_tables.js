exports.up = function (knex) {
    return knex.schema 
        .createTable('task', (table)=>{
            table.uuid('id').primary();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.integer('budget').notNullable().defaultTo(0);
            table.string('location').notNullable();
            table.string('type').notNullable();
            table.string('status').notNullable();
            table.date('date').notNullable();
            table.uuid('poster_id').references('user.id').onUpdate('CASCADE')
            .onDelete('CASCADE');
            table.uuid('helper_id').references('user.id').onUpdate('CASCADE')
            .onDelete('CASCADE');
        })
}


exports.down = function (knex) {
    return knex.schema.dropTable('task');
}