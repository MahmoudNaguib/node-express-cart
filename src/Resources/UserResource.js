const {getDate} = require('../Helpers/Helpers');
const BaseResource=require('./BaseResource');
module.exports=class UserResource extends BaseResource{
    resource(row,token='') {
        if(row){
            let data={
                type: 'users',
                id: parseInt(row.id.toString()),
                attributes: {
                    type:row.type,
                    name:row.name,
                    email: row.email,
                    mobile:row.mobile,
                    image:row.image,
                    created_at: getDate(row.created_at),
                    updated_at: getDate(row.updated_at),
                }
            };
            if(token!=''){
                data.token=token;
            }
            return data;
        }
    }
}