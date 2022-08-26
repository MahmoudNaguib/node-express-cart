const BaseModel = require('./BaseModel');
module.exports = class Address extends BaseModel {
    get tableName() {
        return 'addresses';
    }

    own(req) {
        return this.where({user_id: req.user.id});
    }

    static createRules = {
        title: ['required'],
        country_id: ['required', 'integer'],
        city: ['required'],
        district: ['required'],
        address: ['required'],
    };
    static editRules = {
        title: ['required'],
        country_id: ['required', 'integer'],
        city: ['required'],
        district: ['required'],
        address: ['required'],
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    country() {
        return this.belongsTo(require('./Country'))
    }
}
