const {faker} = require('@faker-js/faker');
const {getRandomInteger} = require('../../Helpers/Helpers');

const factory = {
    generate: (data={}) => {
        let row = {};
        row.post_id = (data.post_id!=undefined)?data.post_id:1;
        row.user_id = (data.user_id!=undefined)?data.user_id:1;
        row.content = faker.lorem.sentence(getRandomInteger(5, 10));
        return row;
    }
}
module.exports = factory;