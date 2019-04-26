const request = require('supertest');
const {app} = require('../../../src/server/app');



test("Test create friend request and accept then remove friend", async () =>{

    const email = "foo@bar.no";
    const emailTwo = "bar@foo.no";

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

    const logoutTwo = await agent.post('/api/logout');
    expect(logoutTwo.statusCode).toBe(204);

    const login = await agent
        .post('/api/login')
        .send({
            email,
            password:"bar",
        })
        .set('Content-Type', 'application/json');
    expect(login.statusCode).toBe(204);

    const friendRequests = await agent
        .get('/api/friend/request');

    expect(friendRequests.statusCode).toBe(200);
    expect(friendRequests.body.includes(emailTwo)).toBe(true);

    const addFriend = await agent
        .post('/api/friend/add')
        .send({email})
        .set('Content-Type', 'application/json');


    const user = await agent.get('/api/user');
    expect(user.body.friends.includes(email)).toBe(true);

    const removeFriend = await agent
        .delete('/api/friend/'+email);

    const userSecond = await agent.get('/api/user');
    expect(userSecond.body.friends.includes(email)).toBe(false);
});

test("Test deny friend request", async () =>{

    const email = "foo@bar.no";
    const emailTwo = "bar@foo.no";

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

    const logoutTwo = await agent.post('/api/logout');
    expect(logoutTwo.statusCode).toBe(204);

    const login = await agent
        .post('/api/login')
        .send({
            email,
            password:"bar",
        })
        .set('Content-Type', 'application/json');
    expect(login.statusCode).toBe(204);

    const friendRequests = await agent
        .get('/api/friend/request');

    expect(friendRequests.statusCode).toBe(200);
    expect(friendRequests.body.includes(emailTwo)).toBe(true);

    const denyRequest = await agent
        .delete('/api/friend/request/'+emailTwo);

    expect(denyRequest.statusCode).toBe(200);

    const friendRequestsTwo = await agent
        .get('/api/friend/request');

    expect(friendRequestsTwo.statusCode).toBe(200);
    expect(friendRequestsTwo.body.includes(emailTwo)).toBe(false);

});