const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');
const TinyUserResource=require('./TinyResources/TinyUserResource');
const TinyCountryResource=require('./TinyResources/TinyCountryResource');
module.exports=class AddressResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'addresses',
                id: parseInt(row.id.toString()),
                attributes: {
                    user_id:row.user_id,
                    country_id:row.country_id,
                    city:row.city,
                    district:row.district,
                    address:row.address,
                    notes:row.notes,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                    user:new TinyUserResource().resource(row.user),
                    country:new TinyCountryResource().resource(row.country),
                },
            };
        }
    }
}