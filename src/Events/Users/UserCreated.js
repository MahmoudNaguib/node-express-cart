require('dotenv').config();
const NodeMailerWrapper = require("../../Libs/NodeMailerWrapper");
const Model = require('../../Models/User');
const bcrypt = require("bcrypt");
const {getRandomString} = require('../../Helpers/Helpers');
module.exports = {
    run: async (row) => {
        console.log('User created event');
        ///////////////////////
        let parameters = {
            title: 'Welcome message',
            row: row,
        };
        const emailSender = new NodeMailerWrapper(
            row.email,
            "Welcome message",
            "auth/register",
            parameters
        );
        try {
            await emailSender.send();
        } catch (err) {
            console.log(err);
        }
    }
}