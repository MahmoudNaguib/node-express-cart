const Model = new require('../Models/Section');
const Resource = require('../Resources/SectionResource');
module.exports = {
    pairs: async (req, res) => {
        let rows = await Model.findAll({is_active:1});
        return res.send(new Resource().pluck(rows, 'id', 'title'));
    },
    index: async (req, res) => {
        let rows = await Model.forge().where({is_active:1}).fetchPage({withRelated: ['user'],page:(req.query.page) ? req.query.page : 1,pageSize: process.env.PAGE_LIMIT});
        return res.send(await new Resource().collection(rows));
    },
    show: async (req, res) => {
        let row = await Model.findOne({id: req.params.id,is_active:1}, {withRelated: ['user'],require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON())});
    },
}
