/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      id: '2922c286-16cd-4d43-ab98-c79f698a1ab0',
      f_name:'Ahmad',
      l_name: 'Akhtar',
      email:'ahmad@email.com',
      password:'testpassword'
    },
   
    
  ]);
};
