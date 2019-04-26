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


test("Test do logout", async () => {

    overrideFetch(app);

    const email = "foo@bar.no";
    const firstName = "a";
    const surName = "a";
    const birthDate = "090998";
    const country = "norway";

    let u = {email, firstName, surName, birthDate, country};
    const updateLoggedInUser = (user) => {u = user};
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header user={u} updateLoggedInUser={updateLoggedInUser} history={history} />
        </MemoryRouter>
    );

    const html = driver.html();
    const logoutBtn = driver.find("#logoutBtnId").at(0);
    expect(html.includes(notLoggedInText)).toEqual(false);
    expect(logoutBtn.length>0).toBe(true);

    logoutBtn.simulate('click');

    const changed = await asyncCheckCondition(() => {
        driver.update();
        return driver.html().includes(notLoggedInText);
    }, 2000, 200);
    expect(changed).toEqual(true);

    expect(page).toEqual("/");
});
