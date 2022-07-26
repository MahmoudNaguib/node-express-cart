const request = require("supertest");
const app = require("../../../app");

const knex = require("../../Database/knex");
const factory = require("../../Database/Factories/Country");

let createRecord = async () => {
    let created = await knex('countries').insert(await factory.generate());
    if (created) {
        return await knex('countries').where('id', created[0]).first();
    }
}
let deleteRecord = async (record) => {
    return await knex('countries').where('id', record.id).del();
}

describe("Countries", () => {
    test("index", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/countries");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        deleteRecord(record);
    });

    test("show", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/countries/" + record.id);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("pairs", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/countries/pairs");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });
});
