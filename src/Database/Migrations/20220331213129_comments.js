exports.up = function (knex) {
    return knex.schema.createTable('comments', table => {
        table.bigIncrements('id').index();
        table.bigint('post_id').nullable().index();
        table.bigint('user_id').nullable().index();
        table.text('content').nullable();
        table.tinyint('is_active').defaultTo(1).index();
        table.timestamps(true, true);

    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
exports.config = {transaction: false};