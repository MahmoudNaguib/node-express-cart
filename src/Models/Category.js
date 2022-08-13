const BaseModel = require('./BaseModel');
module.exports = class Category extends BaseModel {
    get tableName() {
        return 'categories';
    }
    static createRules = {
        title: ['required'],
    };
    static editRules = {
        title: ['required'],
    };
    user() {
        return this.belongsTo(require('./User'))
    }

}
