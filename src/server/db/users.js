// Used from teachers github repo

const usersByEmail = new Map();
const usersById = new Map();
const friendRequestByEmail = new Map();
let counter = 0;

function getUserByEmail(email){
    return usersByEmail.get(email);
}

function getUserById(id){
    return usersById.get(parseInt(id));
}

function getUsers(){
    return Array.from(usersByEmail.values())
}

function verifyUser(email, password){
    const user = getUserByEmail(email);
    if(user === undefined){
        return false;
    }

    return user.password === password;
}

function createUser(email, password, firstName, surName, birthDate, country){
    const id = counter;
    if(getUserByEmail(email) !== undefined && getUserById(id) !== undefined ){
        return false;
    }
    const user = {
        id: id,
        email: email,
        password: password,
        firstName: firstName,
        surName: surName,
        birthDate: birthDate,
        country: country,
        friends: []
    };
    usersByEmail.set(email, user);
    usersById.set(id, user);
    counter++;
    return true;
}

function updateUser(user){
    if(getUserByEmail(user.email) === undefined && getUserById(parseInt(user.id)) === undefined){
        return;
    }
    usersByEmail.set(user.email, user);
    usersById.set(parseInt(user.id), user);
    return true;
}

function sendFriendRequest(emailFrom, emailTo) {
    if (getUserByEmail(emailFrom) === undefined || getUserByEmail(emailTo) === undefined) {
        return false;
    }
    const list = friendRequestByEmail.get(emailTo);
    if(list !== undefined && list.length>0){
        list.push(emailFrom);
        friendRequestByEmail.set(emailTo, list);
    }else{
        friendRequestByEmail.set(emailTo, [emailFrom]);
    }
    return true;
}

function getFriendRequests(email){
    return friendRequestByEmail.get(email)
}

function removeFriendRequest(email, emailFrom){
    if(getFriendRequests(email) === undefined){
        return false;
    }
    const requests = getFriendRequests(email);
    requests.splice(requests.indexOf(emailFrom), 1);
    friendRequestByEmail.set(email, requests);
    return true;
}

function addFriend(emailOne, emailTwo){
    if(getUserByEmail(emailOne) === undefined || getUserByEmail(emailTwo) === undefined){
        return false;
    }
    const userOne = getUserByEmail(emailOne);
    const userTwo = getUserByEmail(emailTwo);
    userOne.friends.push(userTwo.email);
    userTwo.friends.push(userOne.email);
    updateUser(userOne);
    updateUser(userTwo);
    return true;
}

function verifyFriend(emailOne, emailTwo){
    if(getUserByEmail(emailOne) === undefined || getUserByEmail(emailTwo) === undefined){
        return false;
    }
    const userOne = getUserByEmail(emailOne);
    const userTwo = getUserByEmail(emailTwo);

    return verifyFriends(userOne.friends,userTwo.email) &&
        verifyFriends(userTwo.friends,userOne.email);
}

function verifyFriends(friends, email){
    let friend = false;
    friends.forEach(f => {
        if(f === email) friend = true
    });
    return friend
}

function removeFriend(emailOne, emailTwo){
    if(verifyFriend(emailOne, emailTwo)){
        const userOne = getUserByEmail(emailOne);
        const userTwo = getUserByEmail(emailTwo);
        userOne.friends.splice(userOne.friends.indexOf(emailTwo), 1);
        userTwo.friends.splice(userTwo.friends.indexOf(emailOne), 1);
        updateUser(userOne);
        updateUser(userTwo);
        return true;
    }
    return false;
}

function resetAllUsers(){
    usersByEmail.clear();
}

function initWithDefaultData(){
    resetAllUsers();
    createUser("a@a.no", "a", "Alexander", "Bredesen", "090998", "Norway");
    createUser("foo@bar.no", "a", "Foo", "Bar", "090998", "Norway");
    createUser("b@b.no", "a", "b", "b", "090998", "Norway");
    createUser("ba@b.no", "a", "ba", "b", "090998", "Norway");
    createUser("bc@b.no", "a", "bc", "b", "090998", "Norway");
    addFriend("a@a.no", "foo@bar.no");
    addFriend("a@a.no", "b@b.no");
    sendFriendRequest("ba@b.no", "a@a.no");
    sendFriendRequest("bc@b.no", "a@a.no");
}


module.exports = {getUser: getUserByEmail, updateUser, removeFriendRequest, getUserById, sendFriendRequest, getFriendRequests, getUsers, verifyUser, removeFriend, createUser, addFriend, verifyFriend, resetAllUsers, initWithDefaultData};
