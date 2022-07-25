const BaseModel=require('./BaseModel');
module.exports = class User extends BaseModel {
    get tableName() {
        return 'users';
    }
    static loginRules = {
        email: ['required','email'],
        password: ['required','minLength:8'],
    };
    static registerRules = {
        name: ['required','minLength:4'],
        email: ['required','email'],
        mobile: ['required',function(val) {
            console.log('validate mobile');
            if(!val.match('^\\+?[0-9]{10,14}$'))
                throw new Error('Invalid mobile format');
        }],
        password: ['required','minLength:8'],
    };
    static forgotRules = {
        email: ['required','email'],
    };
}