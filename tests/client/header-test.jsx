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

    const user = {userId: "Foo"};
    const updateLoggedInUser = () => {};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header user={user} fetchAndUpdateUserInfo={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInText)).toEqual(false);
});
/**
test("Test do logout", async () => {

    overrideFetch(app);

    const user = {userId: "Foo"};
    const updateLoggedInUser = (id) => {user.userId = id};
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header user={user} updateLoggedInUser={updateLoggedInUser} history={history} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInText)).toEqual(false);

    const logoutBtn = driver.find("#logoutBtnId").at(0);
    logoutBtn.simulate('click');

    const changed = await asyncCheckCondition(() => {
        driver.update();
        return driver.html().includes(notLoggedInText);
    }, 2000, 200);
    expect(changed).toEqual(true);

    expect(page).toEqual("/");
});**/
