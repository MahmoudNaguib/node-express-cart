const {faker} = require('@faker-js/faker');
const {getRandomInteger} = require('../../Helpers/Helpers');

const factory = {
    generate: async (data={}) => {
        let product = await knex('products').orderByRaw('RAND ()').first();
        console.log(product);
        let row = {};
        let quantity=getRandomInteger(1, 5);
        row.order_id = (data.order_id!=undefined)?data.order_id:1;
        row.user_id = (data.user_id!=undefined)?data.user_id:1;
        row.product_id = (data.product_id!=undefined)?data.product_id:product.id;
        row.product_title = (data.product_title!=undefined)?data.product_title:product.title;
        row.product_image = (data.product_image!=undefined)?data.product_image:product.image;
        row.product_price = (data.product_price!=undefined)?data.product_price:product.product_price;
        row.quantity = quantity;
        row.total=quantity*row.product_price;
        return row;
    }
}
module.exports = factory;
