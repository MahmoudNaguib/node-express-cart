const BaseResource=require('../BaseResource');

module.exports=class TinyCategoryResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                title: row.title,
            };
        }
    }
}
