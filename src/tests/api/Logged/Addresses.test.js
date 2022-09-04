const request = require("supertest");
const app = require("../../../../app");
const factory = require("../../../Database/Factories/Address");
const knex = require("../../../Database/knex");

let getUser = async () => {
    return await knex('users').where('type', 'Admin').first();
}
let createRecord = async () => {
    let user = await getUser();
    let created = await knex('addresses').insert(await factory.generate({user_id: user.id}));
    if (created) {
        return await knex('addresses').where('id', created[0]).first();
    }
}
let deleteRecord = async (record) => {
    return await knex('addresses').where('id', record.id).del();
}

describe("Addresses", () => {
    test("index", async () => {
        let record = await createRecord();
        let user = await getUser();
        const res = await request(app)
            .get("/api/addresses")
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
            .get("/api/addresses/" + record.id)
            .set('Authorization', 'Bearer ' + user.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("store with empty fields", async () => {
        let user = await getUser();
        let data = {};
        const res = await request(app)
            .post("/api/addresses")
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
            .post("/api/addresses")
            .set('Authorization', 'Bearer ' + user.token)
            .send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('data');
        let record = await knex('addresses').where('id', res.body.data.id).first();
        deleteRecord(record);
    });

    test("update with empty fields", async () => {
        let record = await createRecord();
        let user = await getUser();
        let data = {};
        const res = await request(app)
            .put("/api/addresses/" + record.id)
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
            .put("/api/addresses/" + record.id)
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
            .delete("/api/addresses/" + record.id)
            .set('Authorization', 'Bearer ' + user.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });


    test("pairs", async () => {
        let record = await createRecord();
        let user = await getUser();
        const res = await request(app)
            .get("/api/addresses/pairs")
            .set('Authorization', 'Bearer ' + user.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

});
