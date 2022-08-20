const BaseResource=require('../BaseResource');

module.exports=class TinyAddressResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                title: row.title,
            };
        }
    }
}
