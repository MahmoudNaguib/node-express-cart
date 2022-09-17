const Model = require('../../Models/Post');
const Resource = require('../../Resources/PostResource');
/*********Comments**********/
const CommentModel = require('../../Models/Comment');
const CommentResource = require('../../Resources/CommentResource');
/*********************/

module.exports = {
    index: async (req, res) => {
        let rows = await Model.forge()
            .filter(req.query)
            .where({is_active: 1})
            .orderBy('id', 'DESC')
            .fetchPage({
                withRelated: ['user', 'section'],
                page: (req.query.page) ? req.query.page : 1,
                pageSize: process.env.PAGE_LIMIT
            });
        return res.send(await new Resource().collection(rows));
    },

    show: async (req, res) => {
        let row = await Model.findOne({id: req.params.id, is_active: 1}, {withRelated: ['user', 'section'], require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON())});
    },

    comments: async (req, res) => {
        /***********Check post is exist************/
        let row = await Model.findOne({id: req.params.id}, {require: false});
        if (!row) {
            return res.status(404).send({message: 'Post not found'});
        }
        /*****************************************/
        let rows = await CommentModel.forge().where({post_id: req.params.id}).fetchPage({
            withRelated: ['user', 'post'],
            page: (req.query.page) ? req.query.page : 1,
            pageSize: process.env.PAGE_LIMIT
        });
        return res.send(await new CommentResource().collection(rows));
    },

    createComment: async (req, res) => {
        /***********Check post is exist************/
        let row = await Model.findOne({id: req.params.id}, {require: false});
        if (!row) {
            return res.status(404).send({message: 'Post not found'});
        }
        /*****************************************/
        try {
            req.body.user_id = req.user.id;
            let row = await CommentModel.create(req.body);
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new CommentResource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },
}
