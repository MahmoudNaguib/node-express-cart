const BaseResource=require('../BaseResource');

module.exports=class TinyCountryResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                title: row.title,
            };
        }
    }
}
