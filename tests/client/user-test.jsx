// https://github.com/arcuri82/web_development_and_api_design
import User from "../../src/client/user/user";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideWebSocket, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

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

test("Test show user", async () => {
    const email = "foo@bar.no";
    const firstName = "foo";
    const surName = "bar";
    const birthDate = "090998";
    const country = "norway";
    const friends = [];

    let u = {email: email, firstName: firstName, surName: surName, birthDate: birthDate, country: country, friends: friends};

    const callback = () => new Promise(resolve => resolve());

    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/user"]}>
            <User callback={callback()} loggedInUser={u} user={u} history={history}/>
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(firstName)).toEqual(true);
    expect(html.includes(surName)).toEqual(true);
    expect(html.includes(birthDate)).toEqual(true);
    expect(html.includes(email)).toEqual(true);
});



