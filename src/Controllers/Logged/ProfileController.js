const Model = require('../../Models/User');
const Resource = require('../../Resources/UserResource');
const bcrypt = require('bcrypt');
module.exports={
    index: async (req, res) => {
        let row = await Model.findOne({id: req.user.id}, {require: false});
        if (!row) {
            return res.status(404).send({message: 'Record not found'});
        }
        return res.send({data: new Resource().resource(row.toJSON(),row.toJSON().token)});
    },

    edit: async (req, res) => {
        try {
            /****** Update token ***********/
            req.body.token=bcrypt.hashSync(req.user.email, process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT);
            /****** Update token ***********/
            let row = await Model.update(req.body, {id: req.user.id, require: false});
            if (row) {
                return res.status(201).send({message: 'Updated successfully', data: new Resource().resource(row.toJSON(),req.body.token)});
            }
        } catch (err) {
            return res.send(err);
        }
    },

    changePassword: async (req, res) => {
        try {
            /****** Update token ***********/
            req.body.token=bcrypt.hashSync(req.user.email, process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT);
            /****** Update token ***********/
            let data={
                password: await bcrypt.hashSync(req.body.password, process.env.HASH_SALT),
                token:await bcrypt.hashSync(req.user.email, process.env.HASH_SALT)
                    +  await bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT)
            }
            let row = await Model.update(data, {id: req.user.id, require: false});
            if (row) {
                return res.status(201).send({message: 'Updated successfully', data: new Resource().resource(row.toJSON(),req.body.token)});
            }
        } catch (err) {
            return res.send(err);
        }
    },

    changeImage: async (req, res) => {
        try {
            let row = await Model.update({image:req.body.image}, {id: req.user.id, require: false});
            if (row) {
                return res.status(201).send({message: 'Updated successfully', data: new Resource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },
}
