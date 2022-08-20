exports.up = function (knex) {
    return knex.schema.createTable('addresses', table => {
        table.bigIncrements('id').index();
        table.string('title').nullable();
        table.bigint('user_id').nullable().index();
        table.bigint('country_id').nullable().index();
        table.string('city').nullable();
        table.string('district').nullable();
        table.string('address').nullable();
        table.string('notes').nullable();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('addresses');
};
exports.config = { transaction: false };