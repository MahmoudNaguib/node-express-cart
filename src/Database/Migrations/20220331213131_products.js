exports.up = function (knex) {
    return knex.schema.createTable('products', table => {
        table.bigIncrements('id').index();
        table.bigint('category_id').nullable().index();
        table.bigint('user_id').nullable().index();
        table.string('title').nullable();
        table.text('content').nullable();
        table.float('price').nullable();
        table.string('image').nullable();
        table.tinyint('is_active').defaultTo(1).index();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
exports.config = { transaction: false };