const knex = require('../Database/knex');
const factory = require('../Database/Factories/Cart');
const {getRandomInteger} = require('../Helpers/Helpers');
const shopping = {
    createOrder: async (user_id, cartItems, orderInfo) => {
        let row = {};
        let total = 0;
        let address;
        let productsList = [];
        let user = await knex('users')
            .where({id: user_id})
            .orderByRaw('RAND ()').first();
        if (user) {
            /************* Address Info *************/
            address = orderInfo.address;
            let country = await knex('countries')
                .where({id: address.country_id}).first();
            let fullAddress = country.title + ', ' + address.city +
                ', ' + address.district + ', ' + address.address
                + '<br>' + address.notes;
            /**************************/
            if (cartItems) {
                for (let k = 0; k < cartItems.length; k++) {
                    let row = await knex('products').where({id: cartItems[k].product_id}).first();
                    let product = {};
                    product.id = row.id;
                    product.category_id = row.category_id;
                    product.title = row.title;
                    product.unit_price = row.price;
                    product.quantity = cartItems[k].quantity;
                    product.total = product.unit_price * product.quantity;
                    product.image = row.image;
                    productsList.push(product);
                    total = total + product.total;
                }
            }
            row.user_id = user.id;
            row.address_id = address.id;
            row.full_address = fullAddress;
            row.contact_name = orderInfo.contact_name;
            row.contact_mobile = orderInfo.contact_name;
            row.total = total;
            row.status = 'Pending';
            row.products = JSON.stringify(productsList);
        }
        return row;
    },
    createCart: async (user_id) => {
        let rows = [];
        let products = await knex('products').orderByRaw('RAND ()').limit(getRandomInteger(1, 3));
        for (let j = 0; j < products.length; j++) {
            let row = await factory.generate({product_id: products[j].id, user_id: user_id});
            rows.push(row);
        }
        return rows;
    },
}
module.exports = shopping;