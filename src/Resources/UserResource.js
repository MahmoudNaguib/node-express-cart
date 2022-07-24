const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');
module.exports=class UserResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                type: 'users',
                id: parseInt(row.id.toString()),
                attributes: {
                    type:row.type,
                    name:row.name,
                    email: row.email,
                    mobile:row.mobile,
                    image:row.image,
                    token: row.token,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                }
            };
        }
    }
}