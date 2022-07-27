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
        return res.send('Edit');
    },
    changePassword: async (req, res) => {
        return res.send('Change Password');
    },
    changeImage: async (req, res) => {
        return res.send('Change Image');
    },
}
