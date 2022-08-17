const {faker} = require('@faker-js/faker');
const {getRandomInteger} = require('../../Helpers/Helpers');

const factory = {
    generate: (data={}) => {
        let row = {};
        row.user_id = (data.user_id!=undefined)?data.user_id:1;
        row.product_id = (data.product_id!=undefined)?data.product_id:1;
        row.quantity = getRandomInteger(1, 5);
        return row;
    }
}
module.exports = factory;
