const BaseModel = require('./BaseModel');
const knex = require('../Database/knex');
const UserCreated = require("../Events/Users/UserCreated");
const ForgotPassword = require("../Events/Users/ForgotPassword");
module.exports = class User extends BaseModel {
    get tableName() {
        return 'users';
    }
    initialize() {
        this.on('created', (model) => {
            UserCreated.run(model.toJSON());
        })
    }

    static loginRules = {
        email: ['required', 'email'],
        password: ['required', 'minLength:8'],
    };
    static registerRules = {
        name: ['required', 'minLength:4'],
        email: ['required', 'email','exists:users:email'],
        mobile: ['required', function (val) {
            if (!val.match('^\\+?[0-9 -]{10,15}$'))
                throw new Error('Invalid mobile format');
        }],
        password: ['required', 'minLength:8'],
    };
    static editRules = {
        name: ['required', 'minLength:4'],
        email: ['required', 'email','unique:users:email'],
        mobile: ['required', function (val) {
            if (!val.match('^\\+?[0-9 -]{10,15}$'))
                throw new Error('Invalid mobile format');
        }],
    };
    static changePasswordRules = {
        old_password: ['required', 'minLength:8','matchPassword'],
        password: ['required', 'minLength:8','same:password_confirmation'],
        password_confirmation: ['required', 'same:password'],
    };
    static forgotRules = {
        email: ['required', 'email'],
    };
}