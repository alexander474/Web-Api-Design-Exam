const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Header} = require('../../src/client/header');
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

const notLoggedInMsg = "You are not logged in";

test("Test not logged in", async () => {

    const user = null;
    const updateLoggedInUser = () => {};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header  user={user} updateLoggedInUser={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInMsg)).toEqual(true);
});


test("Test logged in", async () => {

    const user = {userId: "Foo"};
    const updateLoggedInUser = () => {};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header user={user} updateLoggedInUser={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInMsg)).toEqual(false);
    expect(html.includes(user.userId)).toEqual(true);
});

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
    expect(html.includes(user.userId)).toEqual(true);

    const logoutBtn = driver.find("#logoutBtnId").at(0);
    logoutBtn.simulate('click');

    const changed = await asyncCheckCondition(() => {
        driver.update();
        const displayed = driver.html().includes(user.userId);
        return !displayed;
    }, 2000, 200);
    expect(changed).toEqual(true);

    expect(user.userId).toEqual(null);
    expect(page).toEqual("/");
});
