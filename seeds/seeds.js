const usersData = require('./seeds_data/users');
const tasksData = require('./seeds_data/tasks');
const commentsData = require('./seeds_data/comments');


exports.seed = function (knex) {
    return knex('users').del().then(()=>{
        return knex('users').insert(usersData);
    }).then(()=>{
        return knex('tasks').del();
    }).then(()=>{
        return knex('tasks').insert(tasksData);
    }).then(()=>{
        return knex('comments').del();
    })
    .then(()=>{
        return knex('comments').insert(commentsData);
    })
}