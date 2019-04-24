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
    
}

function getPost(id){
    let post = null;
    for(let i=0; i<posts.length; i++){
        if(posts[i].id === id) post = post[i];
    }
    return post;
}