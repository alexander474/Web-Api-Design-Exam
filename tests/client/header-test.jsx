const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Header} = require('../../src/client/header');
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

const logoutButtonText = "Logout";

test("Test not logged in", async () => {

    const user = null;
    const updateLoggedInUser = () => {};

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Header  user={user} fetchAndUpdateUserInfo={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(logoutButtonText)).toEqual(false);
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
    expect(driver.find("#logoutBtnId").text()).toEqual(logoutButtonText);
    expect(html.includes(logoutButtonText)).toEqual(true);
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
    expect(html.includes(logoutButtonText)).toEqual(true);
    expect(driver.find("#logoutBtnId").text()).toEqual(logoutButtonText);

    driver.find("#logoutBtnId").simulate('click');

    const changed = await asyncCheckCondition(() => {
        driver.update();
        const displayed = driver.html().includes(logoutButtonText);
        return !displayed;
    }, 2000, 200);
    //expect(changed).toEqual(true);

    //expect(driver.html().includes("Login")).toEqual(true);
    expect(page).toEqual("/");
});
