const request = require('supertest');
const {app} = require('../../../src/server/app');

test("test not logged in", async () => {
    const keyword = "nor";
    const response = await request(app)
        .get('/api/search/'+keyword);
    expect(response.statusCode).toBe(401);
});