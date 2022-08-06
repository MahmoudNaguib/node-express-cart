const Model = require('../Models/User');
const Resource = require('../Resources/UserResource');
const bcrypt = require('bcrypt');
const ForgotPassword = require("../Events/Users/ForgotPassword");
module.exports = {
    login: async (req, res) => {
        let row = await Model.findOne({email: req.body.email}, {require: false});
        if (!row) {
            return res.status(403).send({message: 'There is no account with this email'});
        }
        if (!row.toJSON().is_active) {
            return res.status(403).send({message: 'This account is banned'});
        }
        if (!row.toJSON().is_confirmed) {
            return res.status(403).send({message: 'This account is not confirmed his email'});
        }
        if (!await bcrypt.compare(req.body.password, row.toJSON().password)) {
            return res.status(403).send({message: 'Invalid password'});
        }
        return res.send({data: new Resource().resource(row.toJSON(), row.toJSON().token)})
    },
    register: async (req, res) => {
        try {
            /******hash password and set token****/
            req.body.password = bcrypt.hashSync(req.body.password, process.env.HASH_SALT);
            req.body.confirm_token=bcrypt.hashSync(req.body.email, process.env.HASH_SALT)
                + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT);
            req.body.token=bcrypt.hashSync(req.body.email, process.env.HASH_SALT)
                + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT);
            req.body.is_confirmed=process.env.USER_IS_CONFIRMED;
            /**********/
            let row = await Model.create(req.body);
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(row.toJSON())});
            }
        } catch (err) {
            return res.send(err);
        }
    },
    forgot: async (req, res) => {
        let row = await Model.findOne({email: req.body.email}, {require: false});
        if (!row) {
            return res.status(403).send({message: 'There is no account with this email'});
        }
        /*******Run ForgotPassword Event********/
        await ForgotPassword.run(row.toJSON());
        /**********************/
        let message = 'New password has been sent to your email';
        if ((process.env.APP_ENV != 'production')) {
            message += ", Only in production";
        }
        return res.status(200).send({message: message});
    },
}
