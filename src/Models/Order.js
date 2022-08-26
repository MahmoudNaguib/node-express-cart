const BaseModel = require('./BaseModel');
const {getOrderStatuses} = require('../Helpers/Shopping');

module.exports = class Order extends BaseModel {
    get tableName() {
        return 'orders';
    }

    filter(filters) {
        let filtersData={};
        if(filters){
            if(filters.hasOwnProperty('status')){
                filtersData['status']=filters.status;
            }
            if(filters.hasOwnProperty('user_id')){
                filtersData['user_id']=filters.user_id;
            }
        }
        return this.where(filtersData);
    }

    static createRules = {
        address_id: ['required', 'integer'],
        contact_name: ['required'],
        contact_mobile: ['required', function (val) {
            if (!val.match('^\\+?[0-9 -]{10,15}$'))
                throw new Error('Invalid mobile format');
        }],
    };
    static updateStatusRules = {
        status: ['required', function (val) {
            let options = getOrderStatuses();
            if (!options.includes(val))
                throw new Error('Invalid status value, It must be value in (' + options.join(', ') + ')');
        }],
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    address() {
        return this.belongsTo(require('./Address'))
    }
}
