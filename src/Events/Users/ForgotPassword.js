require('dotenv').config();
const NodeMailerWrapper = require("../../Libs/NodeMailerWrapper");
const bcrypt = require("bcrypt");
const {getRandomString} = require('../../Helpers/Helpers');
const knex=require('../../Database/knex');
module.exports = {
    run: async (row) => {
        if ((process.env.APP_ENV == 'production')) {
            console.log('ForgotPassword event');
            let password = getRandomString(8);
            //let password = 'demo@12345';
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
                    let data = {
                        password: bcrypt.hashSync(password, process.env.HASH_SALT),
                        token: bcrypt.hashSync(row.email, process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT)
                    };
                    await knex('users')
                        .where('id', row.id)
                        .update(data);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
}