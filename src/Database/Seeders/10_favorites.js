require('dotenv').config();
const factory = require('../Factories/Favorite');
const {getRandomInteger} = require('../../Helpers/Helpers');
const {createFavorites} = require('../../Helpers/Shopping');
exports.seed = async function (knex) {
    if(process.env.APP_ENV!='production') {
        // Deletes ALL existing entries
        await knex('favorites').del();
        await knex.raw('ALTER TABLE `favorites` AUTO_INCREMENT = 1');
        let rows = [];
        let users = await knex('users');
        for (let i = 0; i < users.length; i++) {
            let cart = await createFavorites(users[i].id);
            rows = rows.concat(cart);
        }
        await knex('favorites').insert(rows);
    }
}
