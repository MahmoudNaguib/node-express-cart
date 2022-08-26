const BaseModel = require('./BaseModel');
module.exports = class Post extends BaseModel {
    get tableName() {
        return 'posts';
    }

    filter(filters) {
        let filtersData={};
        if(filters){
            if(filters.hasOwnProperty('section_id')){
                filtersData['section_id']=filters.section_id;
            }
        }
        return this.where(filtersData);
    }

    static createRules = {
        section_id: ['required'],
        title: ['required'],
        content: ['required'],
    };

    static editRules = {
        section_id: ['required'],
        title: ['required'],
        content: ['required'],
    };

    user() {
        return this.belongsTo(require('./User'))
    }

    section() {
        return this.belongsTo(require('./Section'))
    }

}