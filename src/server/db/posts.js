const Users = require("./users");
const posts = [];

let counter = 0;

function createPost(email, title, text){
    const id = id;

    if(getPost(id) !== null) return false;

    const post = {
        id: id,
        email: email,
        title: title,
        text: text,
    };

    posts.push(post);
    counter++;
    return true;
}

function getPost(id){
    let post = null;
    for(let i=0; i<posts.length; i++){
        if(posts[i].id === id) post = posts[i];
    }
    return post;
}

function getPosts(){
    return posts;
}

function getUserPosts(email){
    let userPosts = [];
    for(let i=0; i<posts.length; i++){
        if(posts[i].email === email) userPosts.push(posts[i]);
    }
    return userPosts;
}

function getUserAndFriendsPost(user){
    if(user === null ){
        return null;
    }
    let currentPosts = [];
    for(let i=0; i<posts.length; i++){
        if(posts[i].email === user.email || user.friends.contains(posts[i].email)){
            currentPosts.push(posts[i]);
        }
    }
    return currentPosts;
}

module.exports = {createPost, getPost, getPosts, getUserPosts, getUserAndFriendsPost};
