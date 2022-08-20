const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');
const TinyUserResource=require('./TinyResources/TinyUserResource');
const TinyAddressResource=require('./TinyResources/TinyAddressResource');
module.exports=class CartResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'orders',
                id: parseInt(row.id.toString()),
                attributes: {
                    user_id:row.user_id,
                    address_id:row.address_id,
                    total:row.total,
                    status:row.status,
                    full_address:row.full_address,
                    contact_name:row.contact_name,
                    contact_mobile:row.contact_mobile,
                    products:JSON.parse(row.products),
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                    user:new TinyUserResource().resource(row.user),
                    address:new TinyAddressResource().resource(row.address),
                },
            };
        }
    }
}