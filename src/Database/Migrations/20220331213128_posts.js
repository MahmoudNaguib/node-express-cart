exports.up = function (knex) {
    return knex.schema.createTable('posts', table => {
        table.bigIncrements('id').index();
        table.bigint('section_id').nullable().index();
        table.bigint('user_id').nullable().index();
        table.string('title').nullable();
        table.text('content').nullable();
        table.string('image').nullable();
        table.tinyint('is_active',1).defaultTo(1).index();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
exports.config = { transaction: false };