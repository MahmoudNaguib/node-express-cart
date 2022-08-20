const Model = require('../../Models/Order');
const Resource = require('../../Resources/OrderResource');
const CartModel = require('../../Models/Cart');
const AddressModel = require("../../Models/Address");
const {createOrder} = require("../../Helpers/Shopping");
module.exports = {
    index: async (req, res) => {
        let rows = await Model.forge().where({user_id: req.user.id}).fetchPage({
            withRelated: ['user', 'address'],
            page: (req.query.page) ? req.query.page : 1,
            pageSize: process.env.PAGE_LIMIT
        });
        return res.send(await new Resource().collection(rows));
    },

    show: async (req, res) => {
        let row = await Model.findOne({id: req.params.id}, {withRelated: ['user', 'address'], require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON())});
    },

    store: async (req, res) => {
        /***********Check address is existed ************/
        let address = await AddressModel.findOne({id: req.body.address_id}, {require: false});
        if (!address) {
            return res.status(404).send({message: 'Address not found'});
        }
        /***********************/
        /***********Check cart is not empty ************/
        let cart = await CartModel.fetchAll({id: req.user.id}, {require: false});
        if (!cart.length) {
            return res.status(400).send({message: 'There is no items in the cart'});
        }
        /***********************/
        let orderData=await createOrder(req.user.id,cart.toJSON(),{
            address:address.toJSON(),
            contact_name:req.body.contact_name,
            contact_mobile:req.body.contact_mobile
        });
        if(!orderData){
            return res.status(400).send({message: 'Failed to process your request'});
        }
        try {
            let row = await Model.create(orderData);
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },

}
