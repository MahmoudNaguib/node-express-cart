const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');

const TinyCategoryResource=require('./TinyResources/TinyCategoryResource');
const TinyUserResource=require('./TinyResources/TinyUserResource');
module.exports=class ProductResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'products',
                id: parseInt(row.id.toString()),
                attributes: {
                    category_id:row.category_id,
                    user_id:row.user_id,
                    title: row.title,
                    content:row.content,
                    price:row.price,
                    image:row.image,
                    is_active: row.is_active,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                    category:new TinyCategoryResource().resource(row.category),
                    user:new TinyUserResource().resource(row.user),
                },
            };
        }
    }
}