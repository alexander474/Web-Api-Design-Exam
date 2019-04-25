const Posts = require("../../../src/server/db/posts");
const Users = require("../../../src/server/db/users");

beforeEach(()=>{
    Posts.clearPosts();
});

test("Test create post", () =>{
    const email = "a@a.no";
    const title = "title";
    const text = "text";

    Posts.createPost({email: email, title: title, text: text});

    expect(Posts.getUserPosts(email).length).toBe(1);

    Posts.createPost({email: email, title:title, text: text});

    expect(Posts.getUserPosts(email).length).toBe(2);
    expect(Posts.getPosts().length).toBe(2);

    let userPosts = Posts.getUserPosts(email);
    let getUserPostById = Posts.getPost(userPosts[0].id);
    expect(userPosts[0].email === getUserPostById.email).toBe(true);
});

test("Test remove post", () =>{
    const email = "a@a.no";
    const title = "title";
    const text = "text";

    Posts.createPost({email: email, title: title, text: text});

    expect(Posts.getUserPosts(email).length).toBe(1);


    let userPosts = Posts.getUserPosts(email);
    let getUserPostById = Posts.getPost(userPosts[0].id);
    expect(userPosts[0].email === getUserPostById.email).toBe(true);

    Posts.deletePost(getUserPostById.id);

    expect(Posts.getUserPosts(email).length).toBe(0);

});


test("Test get user and friends posts", () => {
    const emailOne = "a@a.no";
    const emailTwo = "foo@bar.no";
    const postOne = {email: emailOne, title: "title", text: "text"};
    const postTwo = {email: emailTwo, title: "title", text: "text"};
    Users.createUser(emailOne, "a", "a", "a", "090998", "norway");
    Users.createUser(emailTwo, "a", "a", "a", "090998", "norway");
    Users.addFriend(emailOne, emailTwo);

    Posts.createPost(postOne);
    Posts.createPost(postTwo);

    expect(Posts.getUserPosts(emailOne).length).toBe(1);
    expect(Posts.getUserPosts(emailTwo).length).toBe(1);
    expect(Posts.getUserAndFriendsPost(Users.getUser(emailOne)).length).toBe(2);
    expect(Posts.getUserAndFriendsPost(Users.getUser(emailTwo)).length).toBe(2);

});