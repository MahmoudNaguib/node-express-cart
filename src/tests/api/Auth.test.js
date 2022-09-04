require('dotenv').config();
const request = require("supertest");
const app = require("../../../app");
const User = require("../../Models/User");
const factory = require("../../Database/Factories/User");

describe("Auth", () => {
    test("login with empty email and empty password", async () => {
        let data = {
            email: "",
            password: ""
        };
        const res = await request(app)
            .post("/api/auth/login")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.email).toBeTruthy();
        expect(res.body.errors.password).toBeTruthy();
    });

    test("login with empty email", async () => {
        let data = {
            email: "",
            password: process.env.DEFAULT_PASSWORD
        };
        const res = await request(app)
            .post("/api/auth/login")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
    });

    test("login with empty password", async () => {
        let data = {
            email: "test@demo.com",
            password: ""
        };
        const res = await request(app)
            .post("/api/auth/login")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
    });

    test("login with invalid email format", async () => {
        let data = {
            email: "test",
            password: process.env.DEFAULT_PASSWORD
        };
        const res = await request(app)
            .post("/api/auth/login")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.email).toBeTruthy();
    });

    test("login with invalid password length", async () => {
        let data = {
            email: "test@test.com",
            password: "test"
        };
        const res = await request(app)
            .post("/api/auth/login")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.password).toBeTruthy();
    });

    test("login with not exist email", async () => {
        let data = {
            email: "test@test.test",
            password: process.env.DEFAULT_PASSWORD
        };
        const res = await request(app)
            .post("/api/auth/login")
            .send(data);
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBeTruthy();
    });

    test("login", async () => {
        let row = await User.findOne({type: 'admin'}, {require: false});
        if (row) {
            let data = {
                email: row.toJSON().email,
                password: process.env.DEFAULT_PASSWORD
            };
            const res = await request(app)
                .post("/api/auth/login")
                .send(data);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data.attributes.email).toBe(data.email);
            expect(res.body.data.token).toBeTruthy();

        }
    });

    test("register with empty fields", async () => {
        let data = {};
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
    });

    test("register with empty name", async () => {
        let data = factory.generate();
        data.name="";
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.name).toBeTruthy();
    });

    test("register with empty email", async () => {
        let data = factory.generate();
        data.email="";
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.email).toBeTruthy();
    });

    test("register with empty mobile", async () => {
        let data = factory.generate();
        data.mobile="";
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.mobile).toBeTruthy();
    });

    test("register with empty password", async () => {
        let data = factory.generate();
        data.password="";
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.password).toBeTruthy();
    });

    test("register with invalid password length", async () => {
        let data = factory.generate();
        data.password="test";
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.password).toBeTruthy();
    });

    test("register with invalid email format", async () => {
        let data = factory.generate();
        data.email="test";
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.email).toBeTruthy();
    });

    test("register", async () => {
        let data = await factory.generate();
        const res = await request(app)
            .post("/api/auth/register")
            .send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.attributes.email).toBe(data.email);
    });

    test("forgot with empty email", async () => {
        let data = {
            email: "",
        };
        const res = await request(app)
            .post("/api/auth/forgot")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
    });

    test("forgot with invalid email format", async () => {
        let data = {
            email: "test",
        };
        const res = await request(app)
            .post("/api/auth/forgot")
            .send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors).toBeTruthy();
    });

    test("forgot with not exist email", async () => {
        let row = await User.findOne({type: 'admin'}, {require: false});
        if (row) {
            let data = {
                email: 'test@test.test',
            };
            const res = await request(app)
                .post("/api/auth/forgot")
                .send(data);
            expect(res.statusCode).toBe(403);
            expect(res.body.message).toBeTruthy();
        }
    });

    test("forgot", async () => {
        let row = await User.findOne({type: 'admin'}, {require: false});
        if (row) {
            let data = {
                email: row.toJSON().email,
            };
            const res = await request(app)
                .post("/api/auth/forgot")
                .send(data);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBeTruthy();
        }
    });
});
