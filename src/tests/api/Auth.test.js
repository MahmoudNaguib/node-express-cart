const request = require("supertest");
const app = require("../../../app");
const Model = require('../../Models/User');

describe("Auth", () => {
    test("login", async () => {
       // let data={email: "admin@demo.com", password:"demo@12345"};
        let row = await Model.findOne({type: 'admin'}, {require: false});
        console.log(row);
        const res = await request(app)
            .post("/api/auth/login")
            .send(data);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.attributes.email).toBe(data.email);
        expect(res.body.data.token).toBeTruthy();
        expect(res.statusCode).toBe(200);
    });
});
