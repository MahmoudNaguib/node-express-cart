const Checkit = require('checkit');
module.exports = (rules)=>async (req, res, next)=>{
    let errors={};
    try {
        await Checkit(rules).run(req.body);
    } catch (err) {
        return res.status(422).send({message: 'Validation error', errors: err});
    }
    next();
}