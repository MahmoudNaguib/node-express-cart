require('dotenv').config();
const NodeMailerWrapper = require("../Libs/NodeMailerWrapper");
const Model = require('../Models/User');
const bcrypt = require("bcrypt");
const {getRandomString} = require('../Helpers/Helpers');
module.exports = {
    run: async (row) => {
        let password = (process.env.APP_ENV=='production')?getRandomString(8):'demo@12345';
        let parameters = {
            title: 'Forgot password',
            row: row,
            password: password
        };
        const emailSender = new NodeMailerWrapper(
            row.email,
            "Forgot password",
            "auth/forgot",
            parameters
        );
        let res = await emailSender.send();
        if (res) {
            try {
                let data = {password: bcrypt.hashSync(password, process.env.HASH_SALT)};
                await Model.update(data, {id: row.id, require: false});
                console.log('Password has been updated for user with id ' + row.id);
            } catch (err) {
                console.log(err);
            }
        }
    }
}