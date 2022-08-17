const factory = require('../Factories/cart');
const {getRandomInteger} = require('../../Helpers/Helpers');

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('orders').del();
    await knex.raw('ALTER TABLE `orders` AUTO_INCREMENT = 1');
    let rows = [];
    let products = [];
    let users = await knex('users');
    for (let i = 0; i < users.length; i++) {
        for (let k = 0; k < getRandomInteger(1, 5); k++) {
            let products = await knex('products').orderByRaw('RAND ()').limit(getRandomInteger(1, 5));
            let total = 0;
            for (let j = 0; j < products.length; j++) {
                total = total + products[j].price;
            }
            let row = {
                user_id: users[i].id,
                total: total
            }
            let order = await knex('orders').insert(row);
            if(order){
                for (let j = 0; j < products.length; j++) {
                    let orderProduct = {
                        order_id: order[0],
                        user_id: users[i].id,
                        product_id:products[j].id,
                        product_title:products[j].title,
                        product_image:products[j].image,
                        product_price:products[j].price,
                        quantity:1,
                        total:products[j].price*1
                    }
                    await knex('order_products').insert(orderProduct);
                }
            }
        }
    }
}
