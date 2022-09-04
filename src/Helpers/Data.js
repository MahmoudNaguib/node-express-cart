const Resize = require("../Libs/Resize");
const {getRandomInteger} = require("./Helpers");
const bcrypt = require("bcrypt");
const knex = require("../Database/knex");
const addressFactory = require("../Database/Factories/Address");
const countriesData = require("../Database/Seeders/data/countries.json");
const data = {
    insertDefaultCountries:async ()=>{
        /********************** Insert default countries ***********************/
        let rows = [];
        if (countriesData) {
            for (let i = 0; i < countriesData.length; i++) {
                let row = {};
                row.iso = countriesData[i].code;
                row.title = countriesData[i].name;
                rows.push(row);
            }
        }
        await knex('countries').insert(rows);
        /*********************************************/
    },

    insertDefaultUsers: async () => {
        /********************** Insert default admin user with address***********************/
        const img = new Resize({large: '400x300', small: '200x150'});
        /////////
        let adminUser = await knex('users').where('type', 'Admin').first();
        let adminUserID;
        if (!adminUser) {
            adminUser = await knex('users').insert({
                    type: 'Admin',
                    name: 'Admin',
                    email: 'admin@demo.com',
                    mobile: '012' + getRandomInteger(10000000, 99999999),
                    password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, process.env.HASH_SALT),
                    token: bcrypt.hashSync('admin@demo.com', process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT),
                    is_active: 1,
                    is_confirmed: 1,
                    image: img.save('public/assets/imgs/samples/users/' + getRandomInteger(1, 10) + '.png')
                }
            );
            adminUserID = adminUser[0];
        } else {
            adminUserID = adminUser.id;
        }
        let adminAddress = await knex('addresses').where('user_id', adminUserID).first();
        if (!adminAddress) {
            let row = await addressFactory.generate({user_id: adminUserID});
            await knex('addresses').insert(row);
        }
        /*********************************************/
        /********************** Insert default guest user with address***********************/
        let guestUser = await knex('users').where('type', 'User').first();
        let guestUserId;
        if (!guestUser) {
            guestUser = await knex('users').insert({
                    type: 'User',
                    name: 'user1',
                    email: 'user1@demo.com',
                    mobile: '012' + getRandomInteger(10000000, 99999999),
                    password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, process.env.HASH_SALT),
                    token: bcrypt.hashSync('user1@demo.com', process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT),
                    is_active: 1,
                    is_confirmed: 1,
                    image: img.save('public/assets/imgs/samples/users/' + getRandomInteger(1, 10) + '.png')
                },
            );
            guestUserId = guestUser[0];
        } else {
            guestUserId = guestUserId.id;
        }
        let guestAddress = await knex('addresses').where('user_id', guestUserId).first();
        if (!guestAddress) {
            let row = await addressFactory.generate({user_id: guestUserId});
            await knex('addresses').insert(row);
        }
        /*********************************************/
    },
}
module.exports = data;