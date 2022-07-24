const BaseResource=require('../BaseResource');

module.exports=class TinyUserResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                name: row.name,
            };
        }
    }
}
