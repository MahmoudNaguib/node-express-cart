const BaseResource=require('../BaseResource');

module.exports=class TinyProductResource extends BaseResource{
    resource(row) {
        if(row){
            return {
                title: row.title,
                image: row.image,
                price: row.price,
            };
        }
    }
}
