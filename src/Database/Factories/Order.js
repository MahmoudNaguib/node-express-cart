const knex = require('../../Database/knex');
const {createOrder, createCart} = require('../../Helpers/Shopping');
const factory = {
    generate: async (data = {}) => {
        let user;
        let row={};
        if (data.user_id) {
            user = await knex('users').where({id: data.user_id}).first();
        } else {
            user = await knex('users').orderByRaw('RAND ()').first();
        }
        let address = await knex('addresses').where({user_id: user.id}).orderByRaw('RAND ()').first();
        let cart = await createCart(user.id);
        if (cart && address) {
            row = await createOrder(user.id, cart, {
                address: address,
                contact_name: user.name,
                contact_mobile: user.mobile
            });
        }
        return row;
    }
}
module.exports = factory;
