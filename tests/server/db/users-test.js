// https://github.com/arcuri82/web_development_and_api_design
const Users = require("../../../src/server/db/users");

beforeEach(()=>{
    Users.resetAllUsers();
});

test("Test create user", () => {
    const email = "a@a.no";
    Users.createUser(email, "a", "a", "a", "090998", "norway");

    const user = Users.getUser(email);
    expect(user.email).toBe(email);
    const userById = Users.getUserById(user.id);
    expect(user.id).toBe(userById.id);
});

test("Test update user", () => {
    const email = "a@a.no";
    Users.createUser(email, "a", "a", "a", "090998", "norway");

    const user = Users.getUser(email);
    expect(user.email).toBe(email);
    const userById = Users.getUserById(user.id);
    expect(user.id).toBe(userById.id);

    const newUser = {
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: "newName",
        surName: user.surName,
        birthDate: user.birthDate,
        country: user.country,
        friends: user.friends
    };
    Users.updateUser(newUser);
    const newCreatedUser = Users.getUser(email);
    expect(newCreatedUser.firstName).toBe("newName");

});

test("Test add friend", () => {
    const email = "a@a.no";
    const emailTwo = "foo@bar.no";
    Users.createUser(email, "a", "a", "a", "090998", "norway");
    Users.createUser(emailTwo, "b", "b", "b", "090998", "norway");
    Users.addFriend(email, emailTwo);

    const user = Users.getUser(email);
    const userTwo = Users.getUser(emailTwo);
    expect(user.email).toBe(email);
    expect(userTwo.email).toBe(emailTwo);
    expect(user.friends.includes(emailTwo)).toBe(true);
    expect(userTwo.friends.includes(email)).toBe(true);
    expect(Users.verifyFriend(email, emailTwo)).toBe(true);

    Users.removeFriend(email, emailTwo);
    expect(user.friends.includes(emailTwo)).toBe(false);
    expect(userTwo.friends.includes(email)).toBe(false);
    expect(Users.verifyFriend(email, emailTwo)).toBe(false);
});

test("Test send friend request", () => {
    const email = "a@a.no";
    const emailTwo = "foo@bar.no";
    Users.createUser(email, "a", "a", "a", "090998", "norway");
    Users.createUser(emailTwo, "b", "b", "b", "090998", "norway");
    Users.sendFriendRequest(email, emailTwo);

    const requests = Users.getFriendRequests(emailTwo);
    expect(requests.includes(email)).toBe(true);
    Users.removeFriendRequest(emailTwo, email);
    expect(requests.includes(email)).toBe(false);
});