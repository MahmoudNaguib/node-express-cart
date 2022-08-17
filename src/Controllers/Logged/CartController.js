const Model = require('../../Models/Cart');
const Resource = require('../../Resources/CartResource');
const ProductModel = require("../../Models/Product");
module.exports = {
    index: async (req, res) => {
        let rows = await Model.forge().where({user_id: req.user.id}).fetchPage({
            withRelated: ['user', 'product'],
            page: (req.query.page) ? req.query.page : 1,
            pageSize: process.env.PAGE_LIMIT
        });
        return res.send(await new Resource().collection(rows));
    },

    store: async (req, res) => {
        /***********Check product is existed ************/
        let row = await ProductModel.findOne({id: req.body.product_id}, {require: false});
        if (!row) {
            return res.status(404).send({message: 'Product not found'});
        }
        /*****************************************/
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
}
