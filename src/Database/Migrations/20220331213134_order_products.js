exports.up = function (knex) {
    return knex.schema.createTable('order_products', table => {
        table.bigIncrements('id').index();
        table.bigint('order_id').nullable().index();
        table.bigint('user_id').nullable().index();
        table.bigint('product_id').nullable().index();
        table.string('product_title').nullable().index();
        table.string('product_image').nullable().index();
        table.float('product_price').nullable().index();
        table.integer('quantity').nullable();
        table.float('total').nullable().index();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('order_products');
};
exports.config = { transaction: false };