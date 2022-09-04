require('dotenv').config();
const factory=require('../Factories/Category');
exports.seed = async function(knex) {
  if(process.env.APP_ENV=='development'){
    // Deletes ALL existing entries
    await knex('categories').del();
    await knex.raw('ALTER TABLE `categories` AUTO_INCREMENT = 1');
    let rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(factory.generate({title: 'Category ' + (i + 1)}));
    }
    await knex('categories').insert(rows);
  }
};
