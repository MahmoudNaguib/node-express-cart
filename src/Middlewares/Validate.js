const Checkit = require('checkit');
const knex = require('../Database/knex');
const bcrypt = require('bcrypt');
module.exports = (rules)=>async (req, res, next)=>{
    Checkit.Validator.prototype.unique = function(val, table, column) {
        return knex(table).where(column, '=', val).where('id', '<>', req.user.id).then(function(resp) {
            if (resp.length > 0) {
                throw new Error('The ' + column + ' field is already in use.');
            }
        });
    }
    Checkit.Validator.prototype.exists = function(val, table, column) {
        return knex(table).where(column, '=', val).then(function(resp) {
            if (resp.length > 0) {
                throw new Error('The ' + column + ' field is already in use.');
            }
        });
    }

    Checkit.Validator.prototype.matchPassword = async function(val) {
        if(!await bcrypt.compare(val, req.user.password)){
             throw new Error('The old_password field is not match your current password');
        }
    }
    Checkit.Validator.prototype.same = function(val,field) {
        if(val!=this._target[field]){
            throw new Error('The field is not match '+field);
        }
        return true
    }


    let errors={};
    try {
        await Checkit(rules).run(req.body);
    } catch (err) {
        return res.status(422).send({message: 'Validation error', errors: err});
    }
    next();
}