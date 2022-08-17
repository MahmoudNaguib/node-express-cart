const factory = require('../Factories/cart');
const {getRandomInteger} = require('../../Helpers/Helpers');
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cart').del();
    await knex.raw('ALTER TABLE `cart` AUTO_INCREMENT = 1');
    let rows = [];
    let users = await knex('users');
    for (let i = 0; i < users.length; i++) {
        let products = await knex('products').orderByRaw('RAND ()').limit(getRandomInteger(1, 5));
        for (let j = 0; j < products.length; j++) {
            let row = factory.generate({product_id: products[j].id, user_id: users[i].id});
            rows.push(row);
        }
    }
   // console.log(rows);
   await knex('cart').insert(rows);
}
