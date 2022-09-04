const request = require("supertest");
const app = require("../../../../app");
const factory = require("../../../Database/Factories/Order");
const knex = require("../../../Database/knex");
const productFactory = require("../../../Database/Factories/Product");

let getUser = async () => {
    return await knex('users').where('type', 'Admin').first();
}
let createProduct = async () => {
    let user = await getUser();
    return await knex('products').insert(await productFactory.generate({user_id: user.id, category_id: 1}));
}
let deleteProduct = async (record) => {
    let product = await knex('products').orderBy('id', 'desc').first();
    return await knex('products').where('id', product.id).del();
}
let createRecord = async () => {
    let user = await getUser();
    let product = await knex('products').orderBy('id', 'desc').first();
    let created = await knex('orders').insert(await factory.generate({user_id: user.id}));
    if (created) {
        return await knex('orders').where('id', created[0]).first();
    }
}
let deleteRecord = async (record) => {
    return await knex('orders').where('id', record.id).del();
}


describe("orders", () => {
    beforeAll(async () => {
        return await createProduct();
    });

    afterAll(async () => {
       return await deleteProduct();
    });

    test("index", async () => {
        let record = await createRecord();
        let user = await getUser();
        const res = await request(app)
            .get("/api/orders")
            .set('Authorization', 'Bearer ' + user.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        deleteRecord(record);
    });

    test("show", async () => {
        let record = await createRecord();
        let user = await getUser();
        const res = await request(app)
            .get("/api/orders/" + record.id)
            .set('Authorization', 'Bearer ' + user.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("store with empty fields", async () => {
        let user = await getUser();
        let data = {};
        const res = await request(app)
            .post("/api/orders")
            .set('Authorization', 'Bearer ' + user.token)
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
    });

    test("store", async () => {
        let user = await getUser();
        let data = await factory.generate({user_id: user.id});
        const res = await request(app)
            .post("/api/orders")
            .set('Authorization', 'Bearer ' + user.token)
            .send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('data');
        let record = await knex('orders').where('id', res.body.data.id).first();
        deleteRecord(record);
    });

});
