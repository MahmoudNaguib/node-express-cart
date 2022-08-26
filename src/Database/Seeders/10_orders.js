const factory = require('../Factories/Order');
const {getRandomInteger} = require('../../Helpers/Helpers');
const {createOrder,createCart} = require('../../Helpers/Shopping');
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('orders').del();
    await knex.raw('ALTER TABLE `orders` AUTO_INCREMENT = 1');
    let rows = [];
    let users = await knex('users');
    for (let i = 0; i < users.length; i++) {
        for(let j=0; j<getRandomInteger(5,10);j++){
            let row = await factory.generate({user_id: users[i].id});
            rows.push(row);
        }
    }
   await knex('orders').insert(rows);
}
