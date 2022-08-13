const factory = require('../Factories/product');
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('products').del();
    await knex.raw('ALTER TABLE `products` AUTO_INCREMENT = 1');
    let rows = [];
    let categories=await knex('categories');
    let users=await knex('users').where({type:'Admin'});
    for(let i=0; i<users.length; i++){
        for(let j=0; j<categories.length; j++){
            for(let k=0; k<20; k++){
                let row=factory.generate({category_id:categories[j].id,user_id:users[i].id});
                rows.push(row);
            }
        }
    }
    await knex('products').insert(rows);
};
