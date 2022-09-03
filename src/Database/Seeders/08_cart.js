require('dotenv').config();
const factory = require('../Factories/Cart');
const {getRandomInteger} = require('../../Helpers/Helpers');
const {createCart} = require('../../Helpers/Shopping');
exports.seed = async function (knex) {
    if (process.env.APP_ENV != 'production') {
        // Deletes ALL existing entries
        await knex('cart').del();
        await knex.raw('ALTER TABLE `cart` AUTO_INCREMENT = 1');
        let rows = [];
        let users = await knex('users');
        for (let i = 0; i < users.length; i++) {
            let cart = await createCart(users[i].id);
            rows = rows.concat(cart);
        }
        await knex('cart').insert(rows);
    }
}
