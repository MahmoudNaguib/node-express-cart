const {faker} = require('@faker-js/faker');
const {getRandomInteger,getRandomString} = require('../../Helpers/Helpers');

const factory = {
    generate: (data={}) => {
        let row = {};
        row.iso = getRandomString(2);
        row.title = faker.lorem.word(getRandomInteger(5,10));
        return row;
    }
}
module.exports = factory;
