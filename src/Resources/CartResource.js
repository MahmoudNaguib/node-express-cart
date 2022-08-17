const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');
const TinyProductResource=require('./TinyResources/TinyProductResource');
const TinyUserResource=require('./TinyResources/TinyUserResource');
module.exports=class CartResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'cart',
                id: parseInt(row.id.toString()),
                attributes: {
                    user_id:row.user_id,
                    product_id:row.product_id,
                    quantity:row.quantity,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                    product:new TinyProductResource().resource(row.product),
                    user:new TinyUserResource().resource(row.user),
                },
            };
        }
    }
}