import bcrypt from 'bcrypt';

import app from '../src/app';
import request from 'supertest';
import User from '../src/models/user.model';

const loginUserCredentials = {
    email: 'admin@admin.com',
    password: 'admin'
};

beforeAll( async () => {
    const user = await User.findOne({email: loginUserCredentials.email});
    if(!user) {await User.insert({ id: 1, email: loginUserCredentials.email, full_name: 'Admin', password: bcrypt.hashSync(loginUserCredentials.password, bcrypt.genSaltSync(10)) })}
})

describe("POST /api/auth/login", () => {
    it("should login user with the provided credentials.", async () => {
        const response =  await request(app)
            .post('/api/auth/login')
            .send(loginUserCredentials)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            const user = await User.findOne({email: loginUserCredentials.email});
            expect(response.body).toMatchObject({data: {
                email: user.email,
                user_id: user.id,
                full_name: user.full_name
            }});
    });

    it("should not login nonexistent user.", async () => {
        return request(app)
            .post('/api/auth/login')
            .send({email: 'nonexistentuser@mail.com', password: 'sdfs'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
    });
});