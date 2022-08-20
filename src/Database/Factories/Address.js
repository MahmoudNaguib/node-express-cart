const {faker} = require('@faker-js/faker');
const {getRandomInteger,getRandomString} = require('../../Helpers/Helpers');
const knex = require('../../Database/knex');

const factory = {
    generate: async (data={}) => {
        let user = await knex('users').orderByRaw('RAND ()').first();
        let country = await knex('countries').orderByRaw('RAND ()').first();
        let row = {};
        row.title='Address '+getRandomInteger(100,10000);
        row.user_id = (data.user_id!=undefined)?data.user_id:user.id;
        row.country_id = (data.country_id!=undefined)?data.country_id:country.id;
        row.city = faker.lorem.word(getRandomInteger(5,10));
        row.district = faker.lorem.word(getRandomInteger(5,10));
        row.address = faker.lorem.sentence(getRandomInteger(5, 20));
        row.notes = faker.lorem.sentence(getRandomInteger(5, 20));
        return row;
    }
}
module.exports = factory;
