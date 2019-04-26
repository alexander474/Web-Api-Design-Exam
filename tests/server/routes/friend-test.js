const request = require('supertest');
const {app} = require('../../../src/server/app');


let counter = 0;

test("Test create friend request", async () =>{

    const email = "foo@bar" + (counter++)+".no";
    const emailTwo = "bar@foo" + (counter++)+".no";

    //use same cookie jar for the HTTP requests
    const agent = request.agent(app);

    let create = await agent
        .post('/api/signup')
        .send({
            email,
            password:"bar",
            firstName: "foo",
            surName: "bar",
            birthDate: "090998",
            country: "norway",
        })
        .set('Content-Type', 'application/json');

    expect(create.statusCode).toBe(201);
    const logout = await agent.post('/api/logout');
    expect(logout.statusCode).toBe(204);
    const errorRes = await agent.get('/api/user');
    expect(errorRes.statusCode).toBe(401);

    let createTwo = await agent
        .post('/api/signup')
        .send({
            email: emailTwo,
            password:"bar",
            firstName: "foo",
            surName: "bar",
            birthDate: "090998",
            country: "norway",
        })
        .set('Content-Type', 'application/json');

    expect(createTwo.statusCode).toBe(201);


    //using same cookie got from previous HTTP call
    const sendFriendRequest = await agent
        .post('/api/friend')
        .send({email})
        .set('Content-Type', 'application/json');

    expect(sendFriendRequest.statusCode).toBe(200);

    const friendRequests = await agent
        .get('/api/friend/request');

    console.log(friendRequests.body);
    expect(friendRequests.statusCode).toBe(200);
    expect(JSON.stringify(friendRequests.body).includes(email)).toBe(true);

});