const BaseModel = require('./BaseModel');
module.exports = class Country extends BaseModel {
    get tableName() {
        return 'countries';
    }
}
