require('dotenv').config();
const factory = require('../Factories/Comment');
exports.seed = async function (knex) {
    if(process.env.APP_ENV!='production') {
        // Deletes ALL existing entries
        await knex('comments').del();
        await knex.raw('ALTER TABLE `comments` AUTO_INCREMENT = 1');
        let rows = [];
        let posts = await knex('posts');
        let users = await knex('users');
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < posts.length; j++) {
                for (let k = 0; k < 3; k++) {
                    let row = await factory.generate({post_id: posts[j].id, user_id: users[i].id});
                    rows.push(row);
                }
            }
        }
        await knex('comments').insert(rows);
    }
};
