const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Home} = require('../../src/client/home');

const welcomeMessage = "Welcome to my page";
const userID = "abcdefg";

test("Test not logged in", async () => {

    const driver = mount(<Home/>);

    const html = driver.html();
    expect(html.includes(welcomeMessage)).toEqual(true);
    expect(html.includes(userID)).toEqual(false);
});


test("Test logged in", async () => {

    const user = {userId: userID};
    const updateLoggedInUser = () => new Promise(resolve => resolve());

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home user={user} fetchAndUpdateUserInfo={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(welcomeMessage+" "+userID)).toEqual(true);
    expect(html.includes(userID)).toEqual(true);
});

