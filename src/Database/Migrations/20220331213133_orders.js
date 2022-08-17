exports.up = function (knex) {
    return knex.schema.createTable('orders', table => {
        table.bigIncrements('id').index();
        table.bigint('user_id').nullable().index();
        table.float('total').nullable().index();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};
exports.config = { transaction: false };