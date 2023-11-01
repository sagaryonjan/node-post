import app from '../src/app';
import Post from '../src/models/post.model';
var request = require('supertest');

const loginUserCredentials = {
    email: 'admin@admin.com',
    password: 'admin'
};

describe('Post Test', function() {
    var authToken: string;

    beforeAll(async () => {
        const res = await request(app).post('/api/auth/login').send(loginUserCredentials)  
        await Post.truncate();
        authToken = res.body.data.accessToken;
    });

    it("should return list of posts with paginate data", async () => {
        const res =  await request(app)
            .get("/api/posts")
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(200);
            
        expect(res.body.code).toBe(200);
        expect(res.body.data).toHaveProperty('hasNextPage');
        expect(res.body.data).toHaveProperty('page');
        expect(res.body.data).toHaveProperty('pageSize');
    });

    it('should not create a new post if title is not provided', async () => {
        const createPost = { user_id: 1, content: 'Sagar Post1' };

        const res = await request(app)
            .post("/api/posts")
            .send(createPost)
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(res.body.code).toBe(400);
        expect(res.body.message).toBe('Bad Request');
        expect(res.body).toHaveProperty('data');
    });

    it("should create post with valid data and return post", async () => {
        const createPost = { user_id: 1, title: "Sagar post", content: 'Sagar Post1' };

        const res = await request(app)
            .post("/api/posts")
            .send(createPost)
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(200)

        expect(res.body.code).toBe(200);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toMatchObject({
            user_id: createPost.user_id,
            title: createPost.title,
            content: createPost.content
        });
    });

    it("should get information of post", async () => {
        const postId = 1;
        const res = await request(app)
            .get(`/api/posts/${postId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(200)

            expect(res.body.code).toBe(200);
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('title');
            expect(res.body.data).toHaveProperty('content');
            expect(res.body.data).toHaveProperty('user_id');
    });

    it("should respond with not found error if random post id is provided", async () => {
        const postId = 1999;
        const res = await request(app)
            .get(`/api/posts/${postId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(404)

        expect(res.body.code).toBe(404);
        expect(res.body.message).toBe('Post not found.');
    });

    it("should update post with valid data and return data.", async () => {
        const postId = 1;
        const updatePost = { user_id: 1, title: "Updated Post", content: 'Updated Post Content' };
        const res = await request(app)
            .put(`/api/posts/${postId}`)
            .send(updatePost)
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(200)

            expect(res.body.code).toBe(200);
            expect(res.body.data).toMatchObject({
                id: postId,
                user_id: updatePost.user_id,
                title: updatePost.title,
                content: updatePost.content
            });
    });

    it("should not update post if title is not provided.", async () => {
        const postId = 1;
        const updatePost = { user_id: 1, content: 'Updated Post Content' };
        const res = await request(app)
            .put(`/api/posts/${postId}`)
            .send(updatePost)
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(400)

            expect(res.body.code).toBe(400);
            expect(res.body.message).toBe('Bad Request');
            expect(res.body).toHaveProperty('data');
    });

    it("should delete post.", async () => {
        const res = await request(app)
            .delete("/api/posts/1")
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(200)

        expect(res.body.code).toBe(200);
        expect(res.body).toHaveProperty('message');

    });


    it("should respond with not found error if random id sended for post deletion", async () => {
        const res = await request(app)
            .delete("/api/posts/1999")
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(404)

        expect(res.body.code).toBe(404);
        expect(res.body.message).toBe('Post not found.');

    });

});