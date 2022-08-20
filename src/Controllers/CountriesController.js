const Model = require('../Models/Country');
const Resource = require('../Resources/CountryResource');
module.exports = {
    pairs: async (req, res) => {
        let rows = await Model.findAll();
        return res.send(new Resource().pluck(rows, 'id', 'title'));
    },
    index: async (req, res) => {
        let rows = await Model.forge().fetchPage({page: (req.query.page) ? req.query.page : 1, pageSize: process.env.PAGE_LIMIT});
        return res.send(await new Resource().collection(rows));
    },
    show: async (req, res) => {
        let row = await Model.findOne({id: req.params.id}, {require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON())});
    },
}
