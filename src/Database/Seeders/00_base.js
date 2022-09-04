require('dotenv').config();
const bcrypt = require('bcrypt');
const {getRandomInteger} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");
const addressFactory = require("../Factories/Address");
const countriesData = require("./data/countries.json");
const {insertDefaultCountries, insertDefaultUsers}=require("../../Helpers/Data");
exports.seed = async function (knex) {
    await knex('countries').del();
    await knex.raw('ALTER TABLE `countries` AUTO_INCREMENT = 1');
    await insertDefaultCountries();
    await insertDefaultUsers();
};
