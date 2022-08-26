const Model = require('../../Models/Section');
const Resource = require('../../Resources/SectionResource');
module.exports = {
    pairs: async (req, res) => {
        let rows = await Model.findAll({is_active:1});
        return res.send(new Resource().pluck(rows, 'id', 'title'));
    },

    index: async (req, res) => {
        let rows = await Model.forge()
            .fetchPage({
                withRelated: ['user'],
                page:(req.query.page) ? req.query.page : 1,
                pageSize: process.env.PAGE_LIMIT
            });
        return res.send(await new Resource().collection(rows));
    },

    show: async (req, res) => {
        let row = await Model.findOne({id: req.params.id}, {withRelated: ['user'],require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON())});
    },

    store: async (req, res) => {
        try {
            req.body.user_id = req.user.id;
            let row = await Model.create(req.body);
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(row.toJSON())});
            }
        }
        catch (err) {
            return res.send(err);
        }
    },

    update: async (req, res) => {
        try {
            req.body.user_id = req.user.id;
            let row = await Model.update(req.body, {id: req.params.id, require: false});
            if (row) {
                return res.status(201).send({message: 'Updated successfully', data: new Resource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },

    delete: async (req, res) => {
        try {
            let row = await Model.destroy({id: req.params.id, require: false});
            if (row) {
                return res.status(200).send({message: 'Deleted successfully'});
            }
        } catch (err) {
            return res.send(err);
        }
    },
}
