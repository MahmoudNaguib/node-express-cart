const Model = require('../Models/User');
module.exports = async (req, res, next) => {
    if(!req.header("Authorization")){
        return res.status(401).send("Unauthorized user");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    if(!token){
        return res.status(401).send("Unauthorized user");
    }
    let row = await Model.findOne({token: token, is_active: 1, is_confirmed: 1}, {require: false});
    if (!row) {
        return res.status(401).send("Unauthorized user");
    } else {
        req.user = row.toJSON();
        next();
    }
};