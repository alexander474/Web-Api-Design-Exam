// https://github.com/arcuri82/web_development_and_api_design
const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


const {Login} = require('../../src/client/authentication/login');
const {resetAllUsers, getUser, createUser} = require('../../src/server/db/users');


beforeEach(resetAllUsers);


function fillForm(driver, email, password){

    const emailInput = driver.find("#emailInput").at(0);
    const passwordInput = driver.find("#passwordInput").at(0);
    const loginBtn = driver.find("#loginBtn").at(0);

    emailInput.simulate('change', {target: {value: email}});
    passwordInput.simulate('change', {target: {value: password}});

    loginBtn.simulate('click');
}


test("Test form", async () =>{

    const email = "foo@bar.no";
    const password = "123";
    const firstName = "a";
    const surName = "b";
    const birthDate = "090998";
    const country = "norway";
    createUser(email, password, firstName, surName, birthDate, country);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/login"]}>
            <Login fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} history={history} />
        </MemoryRouter>
    );

    fillForm(driver, email, password);

    expect(driver.find("#emailInput").length>0).toEqual(true);
    expect(driver.find("#passwordInput").length>0).toEqual(true);

});