const request = require('supertest');
const {app} = require('../../../src/server/app');

let counter = 0;

test("Test get all", async () =>{

    const response = await request(app)
        .get('/api/menu');

    expect(response.statusCode).toBe(200);
});

test("Test get one", async () =>{
    const user = request.agent(app);

    const signup = await user.post('/api/signup')
        .send({userId:'foo_'+(counter++), password:"bar"})
        .set('Content-Type', 'application/json');

    expect(signup.statusCode).toBe(201);

    const createOne = await user.post('/api/menu')
        .send({dishes: {name: "name", price: 200}})
        .set('Content-Type', 'application/json');

    expect(createOne.statusCode).toBe(200);

    const createTwo = await user.post('/api/menu')
        .send({dishes: {name: "name", price: 200}})
        .set('Content-Type', 'application/json');

    expect(createTwo.statusCode).toBe(200);

    const response = await user.get('/api/menu/'+createOne.body);

    expect(response.statusCode).toBe(200);
});

test("Test create with no auth", async () =>{

    const response = await request(app)
        .post('/api/menu')
        .send({dishes: {name: "name", price: 200}})
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(401);
});

test("Test create with auth", async () =>{
    const user = request.agent(app);

    const signup = await user.post('/api/signup')
        .send({userId:'foo_'+(counter++), password:"bar"})
        .set('Content-Type', 'application/json');

    expect(signup.statusCode).toBe(201);

    const response = await user.post('/api/menu')
        .send({dishes: {name: "name", price: 200}})
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
});

test("Test create with auth", async () =>{
    const user = request.agent(app);

    const signup = await user.post('/api/signup')
        .send({userId:'foo_'+(counter++), password:"bar"})
        .set('Content-Type', 'application/json');

    expect(signup.statusCode).toBe(201);

    const create = await user.post('/api/menu')
        .send({dishes: {name: "name", price: 200}})
        .set('Content-Type', 'application/json');

    expect(create.statusCode).toBe(200);

    const createdId = create.body;

    const get = await user.get('/api/menu/'+createdId);

    expect(get.statusCode).toBe(200);

    const responseDelete = await user.delete('/api/menu/'+createdId);

    expect(responseDelete.body).toEqual(true);

    const getAfterDelete = await user.get('/api/menu/'+createdId);

    expect(getAfterDelete.statusCode).toBe(404);
});

test("Test update with no auth", async () =>{

    const responsePut =await request(app).put('/api/menu/0')
        .send({name: "name", price: 200})
        .set('Content-Type', 'application/json');

    expect(responsePut.statusCode).toBe(401);

});

test("Test update with auth", async () =>{
    const user = request.agent(app);
    const name = "name";
    const newName = "newName";
    const price = 200;
    const newPrice = 400;
    const day = "Monday";

    const signup = await user.post('/api/signup')
        .send({userId:'foo_'+(counter++), password:"bar"})
        .set('Content-Type', 'application/json');

    expect(signup.statusCode).toBe(201);

    const create = await user.post('/api/menu')
        .send({dishes: {name: name, price: price}})
        .set('Content-Type', 'application/json');

    expect(create.statusCode).toBe(200);

    const createdId = create.body;

    const get = await user.get('/api/menu/'+createdId);

    expect(get.statusCode).toBe(200);

    const dto = get.body;

    expect(dto.dishes.name).toBe(name);
    expect(dto.dishes.price).toBe(price);


    const responsePut =await user.put('/api/menu/'+createdId)
        .send({id: createdId, day: day, dishes: {name: newName, price: newPrice}})
        .set('Content-Type', 'application/json');

    expect(responsePut.statusCode).toBe(200);


    const getAfterPut = await user.get('/api/menu/'+createdId);

    expect(getAfterPut.statusCode).toBe(200);
    expect(getAfterPut.body.dishes.name).toBe(newName);
    expect(getAfterPut.body.dishes.price).toBe(newPrice);
    expect(getAfterPut.body.day).toBe(day);
});