// from repo
import signup from "../../src/client/authentication/signup";

const request = require('supertest');
const {app} = require('../../src/server/app');
const WS = require('ws');

const {overrideWebSocket, asyncCheckCondition, checkConnectedWS} = require('../mytest-utils');

let server;
let port;

beforeAll(done => {
    server = app.listen(0, ()=> {
        port = server.address().port;
        overrideWebSocket(port);
        done();
    });
});

afterAll(() => {
    server.close();
});


const sockets = [];

afterEach(() => {
    /*
        make sure to manually free the sockets, otherwise might block Jest and the
        shutting down of Express...
    */
    for(let i=0; i<sockets.length; i++){
        console.log("Closing socket: " + i);
        sockets[i].close();
    }
    sockets.length = 0;
});

test("Test counter update", async () =>{

    //register a client using WS
    const first = new WS('ws://localhost:' + port+"/message");

    sockets.push(first);

    let a = [];
    first.on('message', data => {
        a.push(JSON.parse(data).text)
    });

    /*
        Important here that we check for the connection (and release the current function
        from the event-loop) _after_ we register the ".on" handler, as server sends a message
        on connection
     */
    let connected = await checkConnectedWS(first, 2000);
    expect(connected).toBe(true);
    let updated = await asyncCheckCondition(() => {return a.length===1}, 2000, 200);
    expect(updated).toEqual(true);


    //then connect a second
    const second = new WS('ws://localhost:' + port+"/message");
    sockets.push(second);

    let b = [];
    second.on('message', data => {
        b.push(JSON.parse(data).text)
    });


    connected = await checkConnectedWS(second, 2000);
    expect(connected).toBe(true);

    //both a and b should go up to 2
    updated = await asyncCheckCondition(() => {return a.length===2}, 2000, 200);
    expect(updated).toEqual(true);
    updated = await asyncCheckCondition(() => {return b.length===2}, 2000, 200);
    expect(updated).toEqual(true);
});