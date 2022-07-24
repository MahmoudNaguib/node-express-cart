const factory=require('../Factories/section');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sections').del();
  await knex.raw('ALTER TABLE `sections` AUTO_INCREMENT = 1');
  let rows=[];
  for(let i=0; i<5; i++){
      rows.push(factory.generate({title:'Section '+(i+1)}));
  }
  await knex('sections').insert(rows);
};
