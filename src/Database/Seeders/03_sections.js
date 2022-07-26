require('dotenv').config();
const factory=require('../Factories/Section');
exports.seed = async function(knex) {
  if(process.env.APP_ENV=='development'){
    // Deletes ALL existing entries
    await knex('sections').del();
    await knex.raw('ALTER TABLE `sections` AUTO_INCREMENT = 1');
    let rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(factory.generate());
    }
    await knex('sections').insert(rows);
  }
};
