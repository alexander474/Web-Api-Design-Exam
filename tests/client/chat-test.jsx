// https://github.com/arcuri82/web_development_and_api_design
const React = require('react');
const {mount} = require('enzyme');

const {overrideWebSocket, overrideFetch, asyncCheckCondition} = require('../mytest-utils');

const {Chat} = require('../../src/client/chat/chat');
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


test("Test new chat", async () => {

    overrideFetch(app);
    const driver = mount(<Chat user={
        {
            id: 0,
            email: "c@c.no",
            firstName: "a",
            surName: "b",
            birthDate: "090998",
            country: "norway",
            friends: ["foo@bar.no"]
        }

    } />);

    const msg  = "Hello!";
    const msg2  = "hey! https://www.google.com";


    const predicate = (message) => {
        driver.update();
        const html = driver.html();
        return html.includes(message);
    };

    let displayedMessage;

    fillForm(driver, msg);


    displayedMessage = await asyncCheckCondition(()=>predicate(msg), 3000, 100);
    expect(displayedMessage).toBe(true);
    expect(driver.html().includes(msg2)).toBe(false);

    fillForm(driver, msg2);

    let displayedMessage2;

    displayedMessage2 = await asyncCheckCondition(()=>predicate(msg2), 3000, 100);
    expect(displayedMessage2).toBe(true);
});

function fillForm(driver, message) {
    const selectFriendBtn = driver.find('#friendsChatSelectBtnId').at(0);
    const msgInput = driver.find('#msgInputId').at(0);
    const sendBtn = driver.find('#sendBtnId').at(0);

    selectFriendBtn.simulate('submit');
    msgInput.simulate('change', {target: {value: message}});
    sendBtn.simulate('submit');
}
