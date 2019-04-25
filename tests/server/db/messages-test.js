const Messages = require("../../../src/server/db/messages");

test("test create message", () => {
    Messages.createMessage("a@a.no", "foo@bar.no", "Hey");
    Messages.createMessage("foo@bar.no", "a@a.no", "Hey back!");
    Messages.createMessage("b@b.no", "a@a.no", "Hey From B");
    const userMessages = Messages.getUserMessage("a@a.no");
    expect(userMessages.length).toBe(3);
});