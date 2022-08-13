exports.up = function (knex) {
    return knex.schema.createTable('categories', table => {
        table.bigIncrements('id').index();
        table.bigint('user_id').nullable().index();
        table.string('title').nullable();
        table.string('image').nullable();
        table.tinyint('is_active').index().defaultTo(1);
        table.timestamps(true,true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('categories');
};
exports.config = { transaction: false };