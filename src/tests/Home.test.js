const request = require("supertest");
const app = require("../../app");

describe("Home", () => {
    test("It should res the GET method", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});
