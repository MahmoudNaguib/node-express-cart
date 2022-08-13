const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');
const TinyUserResource = require("./TinyResources/TinyUserResource");

module.exports=class CategoryResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'categories',
                id: parseInt(row.id.toString()),
                attributes: {
                    title: row.title,
                    is_active: row.is_active,
                    image: row.image,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                    user:new TinyUserResource().resource(row.user),
                },
            };
        }
    }
}
