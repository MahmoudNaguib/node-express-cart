const BaseModel = require('./BaseModel');
module.exports = class OrderProduct extends BaseModel {
    get tableName() {
        return 'order_products';
    }

    user() {
        return this.belongsTo(require('./User'))
    }

    order() {
        return this.belongsTo(require('./Order'))
    }

    product() {
        return this.belongsTo(require('./Product'))
    }
}
