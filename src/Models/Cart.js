const BaseModel = require('./BaseModel');
module.exports = class Cart extends BaseModel {
    get tableName() {
        return 'cart';
    }

    static createRules = {
        product_id: ['required','integer'],
        quantity:['required','integer']
    };

    static editRules = {
        product_id: ['required','integer'],
        quantity:['required','integer']
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    product() {
        return this.belongsTo(require('./Product'))
    }
}
