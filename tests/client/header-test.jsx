// https://github.com/arcuri82/web_development_and_api_design
const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Header} = require('../../src/client/header');
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

const notLoggedInText = "Not logged in";

test("Test not logged in", async () => {

    const user = null;
    const updateLoggedInUser = () => {};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header  user={user} fetchAndUpdateUserInfo={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInText)).toEqual(true);
});


test("Test logged in", async () => {

    const email = "foo@bar.no";
    const firstName = "a";
    const surName = "a";
    const birthDate = "090998";
    const country = "norway";

    const user = {email, firstName, surName, birthDate, country};
    const updateLoggedInUser = () => {};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header user={user} fetchAndUpdateUserInfo={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInText)).toEqual(false);
});

