const request = require("supertest");
const app = require("../../../../app");
const User = require("../../../Models/User");
const factory = require("../../../Database/Factories/Address");


describe("Profile", () => {
    test("index", async () => {
        let row = await User.findOne({type: 'admin'}, {require: false});
        const res = await request(app)
            .get("/api/profile")
            .set('Authorization', 'Bearer ' + row.toJSON().token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.attributes.email).toBe(row.toJSON().email);
    });

    test("edit", async () => {
        let row = await User.findOne({type: 'admin'}, {require: false});
        const res = await request(app)
            .put("/api/profile/edit")
            .set('Authorization', 'Bearer ' + row.toJSON().token)
            .send({
                name:row.toJSON().name,
                email:row.toJSON().email,
                mobile:row.toJSON().mobile,
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.attributes.email).toBe(row.toJSON().email);
    });

    test("changePassword", async () => {
        let row = await User.findOne({type: 'admin'}, {require: false});
        const res = await request(app)
            .put("/api/profile/change-password")
            .set('Authorization', 'Bearer ' + row.toJSON().token)
            .send({
                old_password:process.env.DEFAULT_PASSWORD,
                password:process.env.DEFAULT_PASSWORD,
                password_confirmation:process.env.DEFAULT_PASSWORD,
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.attributes.email).toBe(row.toJSON().email);
    });

});
