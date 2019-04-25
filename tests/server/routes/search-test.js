const request = require('supertest');
const {app} = require('../../../src/server/app');

let counter = 0;

test("test not logged in", async () => {
    const keyword = "nor";
    const response = await request(app)
        .get('/api/search/'+keyword);
    expect(response.statusCode).toBe(401);
});

test("test search user firstName", async () =>{
    const keyword = "foo";

    const email = "foo@bar" + (counter++)+".no";
    const agent = request.agent(app);

    let signupSearch = await agent
        .post('/api/signup')
        .send({
            email,
            password:"bar",
            firstName: keyword,
            surName: "bar",
            birthDate: "090998",
            country: "norway",
        })
        .set('Content-Type', 'application/json');
    expect(signupSearch.statusCode).toBe(201);

    let logout = await agent.post('/api/logout');
    expect(logout.statusCode).toBe(204);

    //create user
    let signup = await agent
        .post('/api/signup')
        .send({
            email: "email@email.com",
            password:"bar",
            firstName: "name",
            surName: "bar",
            birthDate: "090998",
            country: "norway",
        })
        .set('Content-Type', 'application/json');
    expect(signup.statusCode).toBe(201);

    const response = await agent
        .get('/api/search/'+keyword);
    expect(response.statusCode).toBe(200);

    console.log(response.body);
    expect(response.body.filter(u => u.firstName === keyword)[0].firstName).toBe(keyword);
});

test("test search user country", async () =>{
    const keyword = "norway";

    const email = "foo@bar" + (counter++)+".no";
    const agent = request.agent(app);

    let signupSearch = await agent
        .post('/api/signup')
        .send({
            email,
            password:"bar",
            firstName: "foo",
            surName: "bar",
            birthDate: "090998",
            country: keyword,
        })
        .set('Content-Type', 'application/json');
    expect(signupSearch.statusCode).toBe(201);

    let logout = await agent.post('/api/logout');
    expect(logout.statusCode).toBe(204);

    //create user
    let signup = await agent
        .post('/api/signup')
        .send({
            email: "email@email.com",
            password:"bar",
            firstName: "name",
            surName: "bar",
            birthDate: "090998",
            country: "norway",
        })
        .set('Content-Type', 'application/json');
    expect(signup.statusCode).toBe(201);

    const response = await agent
        .get('/api/search/'+keyword);
    expect(response.statusCode).toBe(200);

    console.log(response.body);
    expect(response.body.filter(u => u.country === keyword)[0].country).toBe(keyword);
});