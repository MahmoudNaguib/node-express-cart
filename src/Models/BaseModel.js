const knex = require('../Database/knex');
const bookshelf = require('bookshelf')(knex);
const Model = require('bookshelf-modelbase')(bookshelf);
class BaseModel extends Model {
    get requireFetch(){
        return false;
    }

}
module.exports=BaseModel;
