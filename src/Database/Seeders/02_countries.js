const factory=require('../Factories/Country');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('countries').del();
  await knex.raw('ALTER TABLE `countries` AUTO_INCREMENT = 1');
  let rows=[];
  let countriesData = require('../Seeders/data/countries.json');
  if (countriesData) {
    for (let i = 0; i < countriesData.length; i++) {
      let row={};
      row.iso = countriesData[i].code;
      row.title = countriesData[i].name;
      rows.push(row);
    }
  }
  await knex('countries').insert(rows);
};
