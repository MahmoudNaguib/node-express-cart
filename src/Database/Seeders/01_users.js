require('dotenv').config();
const bcrypt = require('bcrypt');
const {getRandomInteger} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");
const factory = require("../Factories/User");
exports.seed = async function (knex) {
    if(process.env.APP_ENV!='production'){
        let rows = [];
        for (let i = 0; i < 5; i++) {
            rows.push(factory.generate());
        }
        await knex('users').insert(rows);
    }
};
