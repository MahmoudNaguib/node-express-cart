const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');

const TinySectionResource=require('./TinyResources/TinySectionResource');
const TinyUserResource=require('./TinyResources/TinyUserResource');
module.exports=class PostResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'posts',
                id: parseInt(row.id.toString()),
                attributes: {
                    section_id:row.section_id,
                    user_id:row.user_id,
                    title: row.title,
                    content:row.content,
                    image:row.image,
                    is_active: row.is_active,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                    section:new TinySectionResource().resource(row.section),
                    user:new TinyUserResource().resource(row.user),
                },
            };
        }
    }
}