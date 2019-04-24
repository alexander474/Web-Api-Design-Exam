const posts = [];

let counter = 0;

function createPost(post){
    const id = counter;

    if(getPost(id) !== null) return false;

    const create= {
        id: id,
        email: post.email,
        title: post.title,
        text: post.text,
    };

    posts.push(create);
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
        if(posts[i].email === user.email ||
            user.friends.includes(posts[i].email)){
            currentPosts.push(posts[i]);
        }
    }
    return currentPosts;
}


function initWithDefaultData(){
    createPost({email:"a@a.no", title: "a title", text: "example"});
    createPost({email:"b@b.no", title: "b title", text: "bexample"});
    createPost({email:"foo@bar.no", title: "foo title", text: "foo example"});
}

module.exports = {createPost, getPost, getPosts, getUserPosts, getUserAndFriendsPost, initWithDefaultData};
