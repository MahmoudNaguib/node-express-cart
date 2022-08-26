const BaseModel=require('./BaseModel');
module.exports=class Post extends BaseModel{
     get tableName() {
          return 'products';
     }

     filter(filters) {
          let filtersData={};
          if(filters){
               if(filters.hasOwnProperty('category_id')){
                    filtersData['category_id']=filters.category_id;
               }
          }
          return this.where(filtersData);
     }

     static createRules = {
          category_id: ['required'],
          title: ['required'],
          content: ['required'],
          price:['required','numeric']
     };

     static editRules = {
          category_id: ['required'],
          title: ['required'],
          content: ['required'],
          price:['required','numeric']
     };

     user() {
          return this.belongsTo(require('./User'))
     }

     category() {
          return this.belongsTo(require('./Category'))
     }

}