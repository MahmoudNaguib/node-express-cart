const Model = require('../Models/User');
module.exports = async function check(req, res, next) {
    const nonSecurePaths = ['/api/auth/login', '/api/auth/register','/api/auth/forgot'];
    if (nonSecurePaths.includes(req.path)) return next();
    const tokenHeader = req.header("Authorization");
    if(tokenHeader){
        const token = tokenHeader.replace("Bearer ", "");
        let row = await Model.findOne({token:token,is_active:1,is_confirmed:1}, {require: false});
        if (!row) {
            return res.status(401).send("Unauthorized");
        }
        req.user = row;
        next();
    }
    return res.status(401).send("Unauthorized");
};