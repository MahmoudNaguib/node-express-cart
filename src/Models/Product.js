const BaseModel=require('./BaseModel');
module.exports=class Post extends BaseModel{
     get tableName() {
          return 'products';
     }
     static createRules = {
          category_id: ['required'],
          user_id: ['required'],
          title: ['required'],
          content: ['required'],
          price:['required','numeric']
     };
     static editRules = {
          category_id: ['required'],
          user_id: ['required'],
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