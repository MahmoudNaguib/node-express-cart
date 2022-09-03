const request = require("supertest");
const app = require("../../../app");


describe("Countries", () => {
    test("index", async () => {
        const res = await request(app).get("/api/countries");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');

    });

    test("pairs", async () => {
        const res = await request(app).get("/api/countries/pairs");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
    });

    test("show", async () => {
        let records = await request(app).get("/api/countries");
        if (records.body.data.length > 0) {
            let id = records.body.data[0].id;
            const res = await request(app).get("/api/countries/" + id);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('data');
        }
    });
});