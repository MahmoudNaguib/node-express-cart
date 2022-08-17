const BaseModel = require('./BaseModel');
module.exports = class Order extends BaseModel {
    get tableName() {
        return 'orders';
    }

    user() {
        return this.belongsTo(require('./User'))
    }

    products() {
        return this.hasMany(require('./OrderProduct'))
    }

}
