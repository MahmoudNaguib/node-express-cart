const Model = require('../../Models/Favorite');
const Resource = require('../../Resources/FavoriteResource');
const ProductModel = require("../../Models/Product");
module.exports = {
    index: async (req, res) => {
        let rows = await Model.forge()
            .where({user_id: req.user.id})
            .orderBy('id', 'DESC')
            .fetchPage({
                withRelated: ['user', 'product'],
                page: (req.query.page) ? req.query.page : 1,
                pageSize: process.env.PAGE_LIMIT
            });
        return res.send(await new Resource().collection(rows));
    },

    show: async (req, res) => {
        let row = await Model.findOne({id: req.params.id}, {withRelated: ['user', 'product'], require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON())});
    },

    store: async (req, res) => {
        /***********Check product is existed ************/
        let product = await ProductModel.findOne({id: req.body.product_id}, {require: false});
        if (!product) {
            return res.status(404).send({message: 'Product not found'});
        }
        /*****************************************/
        try {
            /********************* Check if product exist first*************************/
            let record = await Model.findOne({product_id: req.body.product_id, user_id:req.user.id}, {require: false});
            if(record){
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(record.toJSON())});
            }
            /**********************************/
            req.body.user_id = req.user.id;
            let row = await Model.create(req.body);
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },

    delete: async (req, res) => {
        let row = await Model.findOne({id: req.params.id, user_id: req.user.id}, {require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        if (row.destroy()) {
            return res.status(200).send({message: 'Deleted successfully'});
        }
    },

    pairs: async (req, res) => {
        let rows = await Model.findAll({user_id: req.user.id});
        return res.send(new Resource().pluck(rows, 'id', 'product_id'));
    },
}
