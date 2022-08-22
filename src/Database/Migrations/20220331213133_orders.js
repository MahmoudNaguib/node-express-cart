exports.up = function (knex) {
    return knex.schema.createTable('orders', table => {
        table.bigIncrements('id').index();
        table.bigint('user_id').nullable().index();
        table.bigint('address_id').nullable().index();
        table.text('full_address').nullable();
        table.string('contact_name').nullable();
        table.string('contact_mobile').nullable().index();
        table.float('total').nullable().index();
        table.enum('status',['Pending','Confirmed','Cancelled','In-Progress','In-Shipment','Delivered','Returned']).defaultTo('Pending').index();
        table.text('products').nullable();
        table.timestamps(true, true);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};
exports.config = { transaction: false };