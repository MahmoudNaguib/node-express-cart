const request = require("supertest");
const app = require("../../../app");

const knex = require("../../Database/knex");
const factory = require("../../Database/Factories/Category");

let createRecord = async () => {
    let created = await knex('categories').insert(await factory.generate());
    if (created) {
        return await knex('categories').where('id', created[0]).first();
    }
}
let deleteRecord = async (record) => {
    return await knex('categories').where('id', record.id).del();
}

describe("Categories", () => {

    test("index", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/categories");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        deleteRecord(record);
    });

    test("show", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/categories/" + record.id);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("pairs", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/categories/pairs");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });
});
