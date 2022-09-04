const request = require("supertest");
const app = require("../../../../app");
const factory = require("../../../Database/Factories/Cart");
const productFactory = require("../../../Database/Factories/Product");
const knex = require("../../../Database/knex");


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
    let created = await knex('cart').insert(await factory.generate({user_id: user.id, product_id: product.id}));
    if (created) {
        return await knex('cart').where('id', created[0]).first();
    }
}
let deleteRecord = async (record) => {
    return await knex('cart').where('id', record.id).del();
}

describe("Cart", () => {
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
            .get("/api/cart")
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
            .get("/api/cart/" + record.id)
            .set('Authorization', 'Bearer ' + user.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("store with empty fields", async () => {
        let user = await getUser();
        let data = {};
        const res = await request(app)
            .post("/api/cart")
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
            .post("/api/cart")
            .set('Authorization', 'Bearer ' + user.token)
            .send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('data');
        let record = await knex('cart').where('id', res.body.data.id).first();
        deleteRecord(record);
    });

    test("update with empty fields", async () => {
        let record = await createRecord();
        let user = await getUser();
        let data = {};
        const res = await request(app)
            .put("/api/cart/" + record.id)
            .set('Authorization', 'Bearer ' + user.token)
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        deleteRecord(record);
    });

    test("update", async () => {
        let record = await createRecord();
        let user = await getUser();
        let data = await factory.generate({user_id: user.id});
        const res = await request(app)
            .put("/api/cart/" + record.id)
            .set('Authorization', 'Bearer ' + user.token)
            .send(data);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("delete", async () => {
        let record = await createRecord();
        let user = await getUser();
        const res = await request(app)
            .delete("/api/cart/" + record.id)
            .set('Authorization', 'Bearer ' + user.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
});
