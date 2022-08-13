const BaseModel = require('./BaseModel');
module.exports = class Post extends BaseModel {
    get tableName() {
        return 'posts';
    }

    static createRules = {
        section_id: ['required'],
        user_id: ['required'],
        title: ['required'],
        content: ['required'],
    };
    static editRules = {
        section_id: ['required'],
        user_id: ['required'],
        title: ['required'],
        content: ['required'],
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    section() {
        return this.belongsTo(require('./Section'))
    }

}