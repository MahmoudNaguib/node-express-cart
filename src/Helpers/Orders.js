const UserModel = require('../Models/User');
const ProductModel = require('../Models/Product');
const orders = {
    createOrder: async (user_id) => {
        if(user_id){
            let products = await ProductModel.forge().limit(2).fetchAll();
            if(products){
                products=rows.toJSON();
                console.log(user_id,products);
            }
        }

    },
}
module.exports = orders;