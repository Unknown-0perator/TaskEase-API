exports.up = function (knex) {
    return knex.schema 
        .createTable('users', (table)=>{
            table.uuid('user_id').primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
}


exports.down = function (knex) {
    return knex.schema.dropTable('users');
}