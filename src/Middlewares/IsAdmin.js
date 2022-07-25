const Model = require('../Models/User');
module.exports = async function check(req, res, next) {
    if(req.user==undefined)
        return res.status(401).send("Unauthorized admin");
    if(req.user.type=='Admin')
        next();
    return res.status(401).send("Unauthorized admin");
};