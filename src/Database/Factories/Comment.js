const {faker} = require('@faker-js/faker');
const {getRandomInteger} = require('../../Helpers/Helpers');
const knex = require('../../Database/knex');
const factory = {
    generate: async (data={}) => {
        let user = await knex('users').orderByRaw('RAND ()').first();
        let post = await knex('posts').orderByRaw('RAND ()').first();
        let row = {};
        row.post_id = (data.post_id!=undefined)?data.post_id:post.id;
        row.user_id = (data.user_id!=undefined)?data.user_id:user.id;
        row.content = faker.lorem.sentence(getRandomInteger(5, 10));
        return row;
    }
}
module.exports = factory;