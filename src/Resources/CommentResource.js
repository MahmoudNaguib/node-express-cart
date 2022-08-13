const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');

const TinyPostResource=require('./TinyResources/TinyPostResource');
const TinyUserResource=require('./TinyResources/TinyUserResource');
module.exports=class PostResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'comments',
                id: parseInt(row.id.toString()),
                attributes: {
                    post_id:row.post_id,
                    user_id:row.user_id,
                    content:row.content,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                },
                relationships: {
                    post:new TinyPostResource().resource(row.post),
                    user:new TinyUserResource().resource(row.user),
                },
            };
        }
    }
}