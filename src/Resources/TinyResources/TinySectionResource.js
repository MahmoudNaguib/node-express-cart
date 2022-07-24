const BaseResource=require('../BaseResource');

module.exports=class TinySectionResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                title: row.title,
            };
        }
    }
}
