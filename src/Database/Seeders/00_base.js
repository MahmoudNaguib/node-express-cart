require('dotenv').config();
const bcrypt = require('bcrypt');
const {getRandomInteger} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");
const addressFactory = require("../Factories/Address");
const countriesData = require("./data/countries.json");
exports.seed = async function (knex) {
    /********************** Insert default countries ***********************/
    await knex('countries').del();
    await knex.raw('ALTER TABLE `countries` AUTO_INCREMENT = 1');
    let rows = [];
    let countriesData = require('../Seeders/data/countries.json');
    if (countriesData) {
        for (let i = 0; i < countriesData.length; i++) {
            let row = {};
            row.iso = countriesData[i].code;
            row.title = countriesData[i].name;
            rows.push(row);
        }
    }
    await knex('countries').insert(rows);
    /*********************************************/

    /********************** Insert default user ***********************/
        ///////// image field
    const Resize = require("../../Libs/Resize");
    const img = new Resize({large: '400x300', small: '200x150'});
    /////////
    let rootUser = await knex('users').where('type', 'Admin').first();
    if (!rootUser) {
        await knex('users').insert([
            {
                type: 'Admin',
                name: 'Admin',
                email: process.env.USER_EMAIL,
                mobile: '+2012' + getRandomInteger(10000000, 99999999),
                password: bcrypt.hashSync(process.env.USER_PASSWORD, process.env.HASH_SALT),
                token: bcrypt.hashSync('admin', process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT),
                is_active: 1,
                is_confirmed: 1,
                image: img.save('public/assets/imgs/samples/users/' + getRandomInteger(1, 10) + '.png')
            },
        ]);
    }
    let user = await knex('users').where('type', 'Admin').first();
    if (user) {
        let address = await knex('addresses').where('user_id', user.id).first();
        if (!address) {
            let row = await addressFactory.generate({user_id: user.id});
            await knex('addresses').insert(row);
        }
    }
    /*********************************************/
};
