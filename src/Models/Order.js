const BaseModel = require('./BaseModel');
module.exports = class Order extends BaseModel {
    get tableName() {
        return 'orders';
    }

    static createRules = {
        address_id: ['required', 'integer'],
        contact_name: ['required'],
        contact_mobile: ['required', function (val) {
            if (!val.match('^\\+?[0-9]{10,14}$'))
                throw new Error('Invalid mobile format');
        }],
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    address() {
        return this.belongsTo(require('./Address'))
    }
}
