require('dotenv').config();
const factory = require('../Factories/Address');
const {getRandomInteger} = require("../../Helpers/Helpers");
exports.seed = async function (knex) {
    if (process.env.APP_ENV != 'production') {
        // Deletes ALL existing entries
        await knex('addresses').del();
        await knex.raw('ALTER TABLE `addresses` AUTO_INCREMENT = 1');
        let rows = [];
        let users = await knex('users');
        for (let i = 0; i < users.length; i++) {
            for (let k = 0; k < getRandomInteger(1, 5); k++) {
                let row = await factory.generate({user_id: users[i].id});
                rows.push(row);
            }
        }
        await knex('addresses').insert(rows);
    }
};
