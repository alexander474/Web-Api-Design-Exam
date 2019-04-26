import {EditUser} from "../../src/client/user/editUser";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideWebSocket, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


test("Test show user", async () => {
    overrideFetch(app);
    const id = 0;
    const email = "foo@bar.no";
    const firstName = "foo";
    const surName = "bar";
    const birthDate = "090998";
    const country = "norway";
    const friends = [];

    let u = {id: id, email: email, firstName: firstName, surName: surName, birthDate: birthDate, country: country, friends: friends};

    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/editUser/"]}>
            <EditUser user={u} history={history}/>
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(firstName)).toEqual(true);
    expect(html.includes(surName)).toEqual(true);
    expect(html.includes(birthDate)).toEqual(true);
    expect(html.includes(country)).toEqual(true);
    expect(html.includes(email)).toEqual(false);
});



