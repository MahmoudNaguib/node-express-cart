const BaseModel = require('./BaseModel');
module.exports = class Section extends BaseModel {
    get tableName() {
        return 'sections';
    }
    static createRules = {
        title: ['required'],
        image:['required']
    };
    static editRules = {
        title: ['required'],
    };
    user() {
        return this.belongsTo(require('./User'))
    }

}
