const BaseModel = require('./BaseModel');
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
        email: ['required', 'email'],
        mobile: ['required', function (val) {
            if (!val.match('^\\+?[0-9]{10,14}$'))
                throw new Error('Invalid mobile format');
        }],
        password: ['required', 'minLength:8'],
    };
    static editRules = {
        name: ['required', 'minLength:4'],
        email: ['required', 'email'],
        mobile: ['required', function (val) {
            if (!val.match('^\\+?[0-9]{10,14}$'))
                throw new Error('Invalid mobile format');
        }],
    };
    static changePasswordRules = {
        old_password: ['required', 'minLength:8'],
        password: ['required', 'minLength:8'],
        password_confirmation: ['required', 'minLength:8'],
    };
    static forgotRules = {
        email: ['required', 'email'],
    };
}