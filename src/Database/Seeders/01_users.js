const bcrypt = require('bcrypt');
const {getRandomInteger} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('users').del();
    await knex.raw('ALTER TABLE `users` AUTO_INCREMENT = 1');
    ///////// image field
    const Resize = require("../../Libs/Resize");
    const image = new Resize({large: '400x300', small: '200x150'});
    let fileName =  image.save('public/assets/imgs/samples/users/'+getRandomInteger(1,10)+'.png');
    /////////

    await knex('users').insert([
        {
            type: 'Admin',
            name: 'Admin',
            email: 'admin@demo.com',
            mobile: '+2012'+getRandomInteger(10000000,99999999),
            password: bcrypt.hashSync('demo@12345', process.env.HASH_SALT),
            token: bcrypt.hashSync('admin', process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT),
            is_active: 1,
            is_confirmed: 1,
            image:fileName
        },
        {
            type: 'User',
            name: 'user1',
            email: 'user1@demo.com',
            mobile: '+2012'+getRandomInteger(10000000,99999999),
            password: bcrypt.hashSync('demo@12345', process.env.HASH_SALT),
            token: bcrypt.hashSync('user1', process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT),
            is_active: 1,
            is_confirmed: 1,
            image:fileName
        },
        {
            type: 'User',
            name: 'user2',
            email: 'user2@demo.com',
            mobile: '+2012'+getRandomInteger(10000000,99999999),
            password: bcrypt.hashSync('demo@12345', process.env.HASH_SALT),
            token: bcrypt.hashSync('user2', process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT),
            is_active: 1,
            is_confirmed: 1,
            image:fileName
        },
        {
            type: 'User',
            name: 'user3',
            email: 'user3@demo.com',
            mobile: '+2012'+getRandomInteger(10000000,99999999),
            password: bcrypt.hashSync('demo@12345', process.env.HASH_SALT),
            token: bcrypt.hashSync('user3', process.env.HASH_SALT) + bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT),
            is_active: 1,
            is_confirmed: 1,
            image:fileName
        },
    ]);
};
