import {App} from "../src/app";
import {boot} from "../index";
import request from 'supertest';

let application: App;

beforeAll(async () => {
    const { app } = await boot;
    application = app;
});

describe('Users e2e', () => {
    it('save token', async () => {
        const res = await request(application.app)
            .post('/users/login')
            .send({token: 'fe615a05def503c6ce8375a861a98fff'});
        expect(res.statusCode).toBe(200);
    });
    it('save token wrong', async () => {
        const res = await request(application.app)
            .post('/users/login')
            .send({});
        expect(res.statusCode).toBe(400);
    });
});

afterAll(() => {
    application.close();
})
