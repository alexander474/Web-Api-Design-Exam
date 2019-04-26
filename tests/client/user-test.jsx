import User from "../../src/client/user/user";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideWebSocket, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

const email = "foo@bar.no";

let server;
let port;

/**
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

test("Test show user", async () => {
    const firstName = "foo";
    const surName = "bar";
    const birthDate = "090998";
    const country = "norway";
    const friends = [];

    let u = {email, firstName, surName, birthDate, country, friends};

    const callback = () => new Promise(resolve => resolve());

    const driver = mount(<User callback={callback()} loggedInUser={u} user={u}/>);

    const html = driver.html();
    expect(html.includes(firstName)).toEqual(true);
    expect(html.includes(surName)).toEqual(true);
    expect(html.includes(birthDate)).toEqual(true);
    expect(html.includes(email)).toEqual(true);
});

test("Test show friend", async () => {
    const firstName = "foo";
    const surName = "bar";
    const birthDate = "090998";
    const country = "norway";
    const friends = [];

    const friendEmail = "a@a.no";
    const friendFirstName = "a";
    const friendSurName = "b";
    const friendBirthDate = "101010";
    const friendCountry = "USA";
    const friendFriends = [];

    let u = {email, firstName, surName, birthDate, country, friends};
    let friend = {email: friendEmail, firstName: friendFirstName, surName: friendSurName, birthDate: friendBirthDate, country: friendCountry, friends: friendFriends};

    const callback = () => new Promise(resolve => resolve());

    const driver = mount(<User callback={callback()} loggedInUser={u} user={friend}/>);

    const html = driver.html();
    expect(html.includes(friendFirstName)).toEqual(true);
    expect(html.includes(friendSurName)).toEqual(true);
    expect(html.includes(friendBirthDate)).toEqual(true);
    expect(html.includes(friendEmail)).toEqual(true);
});
**/

