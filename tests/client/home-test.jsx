// https://github.com/arcuri82/web_development_and_api_design
const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');
const {overrideWebSocket, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');
const {Home} = require('../../src/client/home');

const email = "foo@bar.no";

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

test("Test not logged in", async () => {

    const driver = mount(<Home/>);

    const html = driver.html();
    expect(html.includes(email)).toEqual(false);
});


test("Test logged in", async () => {
    const firstName = "a";
    const surName = "a";
    const birthDate = "090998";
    const country = "norway";



    let u = {email, firstName, surName, birthDate, country};
    const updateLoggedInUser = () => new Promise(resolve => resolve());

    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home user={u} fetchAndUpdateUserInfo={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(u.email)).toEqual(true);
});

