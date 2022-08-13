const BaseModel = require('./BaseModel');
module.exports = class Comment extends BaseModel {
    get tableName() {
        return 'comments';
    }

    static createRules = {
        post_id: ['required'],
        content: ['required'],
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    post() {
        return this.belongsTo(require('./Post'))
    }
}
