const Model = require('../../Models/User');
module.exports = {
    confirm: async (req, res) => {
        let row = await Model.findOne({confirm_token: req.params.token}, {require: false});
        if (row) {
            try {
                await Model.update({'confirm_token': null,'is_confirmed':1}, {id: row.id, require: false});
            } catch (err) {
                return console.log(err);
            }
            res.render('auth/confirm', {row: row.toJSON(), 'confirmed': 1});
        } else {
            res.render('auth/confirm', {row: {}, 'confirmed': 0});
        }
    },
}
