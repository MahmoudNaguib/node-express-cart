const {faker} = require('@faker-js/faker');
const {getRandomInteger} = require('../../Helpers/Helpers');
const knex = require('../../Database/knex');
const factory = {
    generate: async (data = {}) => {
        let user = await knex('users').orderByRaw('RAND ()').first();
        let product = await knex('products').orderByRaw('RAND ()').first();
        let row = {};
        row.user_id = (data.user_id != undefined) ? data.user_id : user.id;
        row.product_id = (data.product_id != undefined) ? data.product_id : product.id;
        return row;
    }
}
module.exports = factory;
