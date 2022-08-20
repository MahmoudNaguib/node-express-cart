exports.up = function (knex) {
    return knex.schema.createTable('countries', table => {
        table.bigIncrements('id').index();
        table.string('iso',2).nullable().index();
        table.string('title').nullable();
        table.timestamps(true,true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('countries');
};
exports.config = { transaction: false };