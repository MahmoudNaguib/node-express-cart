const BaseModel = require('./BaseModel');
module.exports = class Favorite extends BaseModel {
    get tableName() {
        return 'cart';
    }

    static createRules = {
        product_id: ['required','integer'],
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    product() {
        return this.belongsTo(require('./Product'))
    }
}
