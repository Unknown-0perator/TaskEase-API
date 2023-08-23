exports.up = function (knex) {
    return knex.schema 
        .createTable('user', (table)=>{
            table.uuid('id').primary();
            table.string('f_name').notNullable();
            table.string('l_name').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
        })
}


exports.down = function (knex) {
    return knex.schema.dropTable('user');
}