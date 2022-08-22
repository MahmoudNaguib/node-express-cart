exports.up = function (knex) {
    return knex.schema.createTable('favorites', table => {
        table.bigIncrements('id').index();
        table.bigint('user_id').nullable().index();
        table.bigint('product_id').nullable().index();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('favorites');
};
exports.config = { transaction: false };