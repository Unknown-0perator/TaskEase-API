exports.up = function (knex) {
    return knex.schema
        .createTable('comments', (table) => {
            table.uuid('comment_id').primary();
            table.string('comment_text').notNullable();
            table.string('timestamp');
            table.uuid('task_id').references('tasks.task_id').onUpdate('CASCADE')
                .onDelete('CASCADE').notNullable();
            table.uuid('user_id').references('users.user_id').onUpdate('CASCADE')
                .onDelete('CASCADE').notNullable();
        })
}


exports.down = function (knex) {
    return knex.schema.dropTable('comments');
}