const Model = require('../../Models/Cart');
const Resource = require('../../Resources/CartResource');
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
        let record = await Model.findOne({product_id: req.body.product_id}, {require: false});
        /***********Update record if product already exist ***********/
        if(record){
            let newQuantity=record.toJSON().quantity+parseInt(req.body.quantity);
            let row = await Model.update({quantity:newQuantity}, {id:record.toJSON().id, require: false});
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(row.toJSON())});
            }
        }
        /*********************************************/
        try {
            req.body.user_id = req.user.id;
            let row = await Model.create(req.body);
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },

    update: async (req, res) => {
        /***********Check product is existed ************/
        let product = await ProductModel.findOne({id: req.body.product_id}, {require: false});
        if (!product) {
            return res.status(404).send({message: 'Product not found'});
        }
        /*****************************************/
        try {
            req.body.user_id = req.user.id;
            let row = await Model.update(req.body, {id: req.params.id, require: false});
            if (row) {
                return res.status(200)
                    .send({message: 'Updated successfully', data: new Resource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },

    delete: async (req, res) => {
        let row = await Model.findOne({id: req.params.id,user_id: req.user.id}, {require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        if(row.destroy()){
            return res.status(200).send({message: 'Deleted successfully'});
        }
    },
}
