// https://github.com/arcuri82/web_development_and_api_design
const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


const {SignUp} = require('../../src/client/authentication/signup');
const {resetAllUsers, getUser, createUser} = require('../../src/server/db/users');


beforeEach(() => {
    resetAllUsers();
});


function fillForm(driver, email, firstName, surName, birthDate, country, password, confirm){

    const emailInput = driver.find("#emailInput").at(0);
    const firstNameInput = driver.find("#firstNameInput").at(0);
    const surNameInput = driver.find("#surNameInput").at(0);
    const birthDateInput = driver.find("#birthDateInput").at(0);
    const countryInput = driver.find("#countryInput").at(0);
    const passwordInput = driver.find("#passwordInput").at(0);
    const confirmInput = driver.find("#confirmInput").at(0);
    const signUpBtn = driver.find("#signUpBtn").at(0);


    emailInput.simulate('change', {target: {value: email}});
    firstNameInput.simulate('change', {target: {value: firstName}});
    surNameInput.simulate('change', {target: {value: surName}});
    birthDateInput.simulate('change', {target: {value: birthDate}});
    countryInput.simulate('change', {target: {value: country}});
    passwordInput.simulate('change', {target: {value: password}});
    confirmInput.simulate('change', {target: {value: confirm}});

    signUpBtn.simulate('click');
}

test("Test password mismatch", async () => {

    const mismatch = "Not matching";

    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp/>
        </MemoryRouter>
    );

    expect(driver.html().includes(mismatch)).toEqual(false);

    fillForm(driver, "foo@bar.no", "a", "a", "a", "a", "123",  "not-matching");

    const error = await asyncCheckCondition(
        () => {driver.update(); return driver.html().includes(mismatch)},
        2000 ,200);

    expect(error).toEqual(true);
});
