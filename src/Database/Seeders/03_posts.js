const factory = require('../Factories/post');
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('posts').del();
    await knex.raw('ALTER TABLE `posts` AUTO_INCREMENT = 1');
    let rows = [];
    let sections=await knex('sections');
    let users=await knex('users').where({type:'Admin'});
    for(let i=0; i<users.length; i++){
        for(let j=0; j<sections.length; j++){
            for(let k=0; k<20; k++){
                let row=factory.generate({section_id:sections[j].id,user_id:users[i].id});
                rows.push(row);
            }
        }
    }
    await knex('posts').insert(rows);
};
