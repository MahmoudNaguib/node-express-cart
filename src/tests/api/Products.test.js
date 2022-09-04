const request = require("supertest");
const app = require("../../../app");

const knex = require("../../Database/knex");
const factory = require("../../Database/Factories/Product");

let createRecord = async () => {
    let created = await knex('products').insert(await factory.generate({user_id: 1, category_id: 1}));
    if (created) {
        return await knex('products').where('id', created[0]).first();
    }
}
let deleteRecord = async (record) => {
    return await knex('products').where('id', record.id).del();
}

describe("Products", () => {
    test("index", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        deleteRecord(record);
    });

    test("show", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/products/" + record.id);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });
});
