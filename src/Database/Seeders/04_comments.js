const factory = require('../Factories/comment');
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('comments').del();
    await knex.raw('ALTER TABLE `comments` AUTO_INCREMENT = 1');
    let rows = [];
    let posts=await knex('posts');
    let users=await knex('users').where({type:'Guest'});
    for(i=0; i<users.length; i++){
        for(j=0; j<posts.length; j++){
            let row=factory.generate({post_id:posts[j].id,user_id:users[i].id});
            rows.push(row);
        }
    }
    await knex('comments').insert(rows);
};
