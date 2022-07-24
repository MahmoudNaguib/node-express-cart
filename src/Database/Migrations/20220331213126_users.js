exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.bigIncrements('id').index();
        table.enum('type',['Admin','Guest']).index().defaultTo('Guest');
        table.string('name').nullable();
        table.string('email').nullable().index();
        table.string('mobile').nullable().index();
        table.string('password').nullable();
        table.string('image').nullable();
        table.string('token').nullable().index();
        table.string('confirm_token').nullable();
        table.string('password_token').nullable();
        table.timestamp('last_logged_in').nullable();
        table.tinyint('is_confirmed').index().defaultTo(process.env.USER_IS_CONFIRMED);
        table.tinyint('is_active').defaultTo(1).index();
        table.timestamps(true,true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
exports.config = { transaction: false };