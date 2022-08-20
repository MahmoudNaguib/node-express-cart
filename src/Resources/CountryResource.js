const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');

module.exports=class CountryResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'countries',
                id: parseInt(row.id.toString()),
                attributes: {
                    iso: row.iso,
                    title: row.title,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                },
            };
        }
    }
}
