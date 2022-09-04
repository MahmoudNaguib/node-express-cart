const request = require("supertest");
const app = require("../../../app");


describe("Home", () => {
    test("index", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});
