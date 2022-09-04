const request = require("supertest");
const app = require("../../../app");

const knex = require("../../Database/knex");
const factory = require("../../Database/Factories/Post");
const commentFactory = require("../../Database/Factories/Comment");

let createRecord = async () => {
    let created = await knex('posts').insert(await factory.generate({user_id: 1, section_id: 1}));
    if (created) {
        return await knex('posts').where('id', created[0]).first();
    }
}
let deleteRecord = async (record) => {
    return await knex('posts').where('id', record.id).del();
}

let deleteComment = async (record) => {
    return await knex('comments').where('id', record.id).del();
}

describe("Posts", () => {
    test("index", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/posts");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        deleteRecord(record);
    });

    test("show", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/posts/" + record.id);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("get comments", async () => {
        let record = await createRecord();
        const res = await request(app).get("/api/posts/" + record.id + "/comments");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
    });

    test("post comment", async () => {
        let record = await createRecord();
        let user=await knex('users').where('type', 'Admin').first();
        let data = await commentFactory.generate({user_id: user.id,post_id:record.id});
        const res = await request(app)
            .post("/api/posts/" + record.id + "/comments")
            .set('Authorization', 'Bearer ' + user.token)
            .send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('data');
        deleteRecord(record);
        let comment = await knex('comments').where('id', res.body.data.id).first();
        deleteComment(comment);
    });
});
