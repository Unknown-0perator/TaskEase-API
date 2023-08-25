/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('task').del()
  await knex('task').insert([
   {
      id: '2922c286-16cd-4d43-ab98-c79f698aeab0',
      title: 'Help me with moving',
      description: 'I am moving from Burnaby to Vancouver and I need someone to give hand',
      location: 'Burnaby',
      type: 'In-Person',
      status: 'Open',
      date: '2024-08-20',
      poster_id: '2922c286-16cd-4d43-ab98-c79f698a1ab0',
      helper_id:null
   },
  ]);
};
