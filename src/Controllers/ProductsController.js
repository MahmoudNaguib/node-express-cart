const Model = require('../Models/Product');
const Resource = require('../Resources/ProductResource');

module.exports={
    index: async (req, res) => {
        let rows = await Model.forge().where({is_active:1}).fetchPage({withRelated: ['user','category'],page:(req.query.page) ? req.query.page : 1,pageSize: process.env.PAGE_LIMIT});
        return res.send(await new Resource().collection(rows));
    },
    show: async (req, res) => {
        let row = await Model.findOne({id: req.params.id,is_active:1}, {withRelated: ['user','category'],require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON())});
    },
}
