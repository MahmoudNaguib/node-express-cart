const Model = require('../Models/User');
const Resource = require('../Resources/UserResource');
const bcrypt = require('bcrypt');
const NodeMailerWrapper = require("../Libs/NodeMailerWrapper");
const updatePasswordAndSendEmail = require("../Events/updatePasswordAndSendEmail");
module.exports={
    login: async (req, res) => {
        let row = await Model.findOne({email:req.body.email}, {require: false});
        if(!row){
            return res.status(403).send({message: 'There is no account with this email'});
        }
        if(!row.toJSON().is_active){
            return res.status(403).send({message: 'This account is banned'});
        }
        if(!row.toJSON().is_confirmed){
            return res.status(403).send({message: 'This account is not confirmed his email'});
        }
        if(! await bcrypt.compare(req.body.password, row.toJSON().password)){
            return res.status(403).send({message: 'Invalid password'});
        }
        return res.send({data: new Resource().resource(row.toJSON())})
    },
    register: async (req, res) => {
        try {
            /******hash password and set token****/
            req.body.password=bcrypt.hashSync(req.body.password, process.env.HASH_SALT);
            req.body.token=bcrypt.hashSync(req.body.email, process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT);
            /**********/
            let row = await Model.create(req.body);
            if (row) {
                return res.status(201).send({message: 'Created successfully', data: new Resource().resource(row.toJSON())});
            }
        }
        catch (err) {
            return res.send(err);
        }
    },
    forgot: async (req, res) => {
        let row = await Model.findOne({email:req.body.email}, {require: false});
        if(!row){
            return res.status(403).send({message: 'There is no account with this email'});
        }
        /*******Sending email********/
        await updatePasswordAndSendEmail.run(row.toJSON());
        /**********************/
        return res.status(200).send({message: 'New password has been sent to your email'});
    },
}
