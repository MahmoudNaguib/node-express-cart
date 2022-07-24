const BaseModel=require('./BaseModel');
module.exports=class Comment extends BaseModel{
     get tableName() {
          return 'comments';
     }
}
