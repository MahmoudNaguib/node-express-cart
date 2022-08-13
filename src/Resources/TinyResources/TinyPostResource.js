const BaseResource=require('../BaseResource');

module.exports=class TinyPostResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                title: row.title,
            };
        }
    }
}
