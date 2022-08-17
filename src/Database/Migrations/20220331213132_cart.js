exports.up = function (knex) {
    return knex.schema.createTable('cart', table => {
        table.bigIncrements('id').index();
        table.bigint('user_id').nullable().index();
        table.bigint('product_id').nullable().index();
        table.integer('quantity').nullable();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('cart');
};
exports.config = { transaction: false };