// Used from teachers github repo

const users = new Map();


function getUser(email){

    return users.get(email);
}

function getUsers(){
    return Array.from(users.values())
}

function verifyUser(email, password){

    const user = getUser(email);

    if(user === undefined){
        return false;
    }

    return user.password === password;
}

function createUser(email, password, firstName, surName, birthDate, country, friends){
    if(getUser(email) !== undefined ){
        return false;
    }

    const user = {
        email: email,
        password: password,
        firstName: firstName,
        surName: surName,
        birthDate: birthDate,
        country: country,
        friends: friends
    };

    users.set(email, user);
    return true;
}

function addFriend(emailOne, emailTwo){
    if(getUser(emailOne) === undefined || getUser(emailTwo) === undefined){
        return false;
    }
    const userOne = getUser(emailOne);
    const userTwo = getUser(emailTwo);
    userOne.friends.push(userTwo.email);
    userTwo.friends.push(userOne.email);
    return true;
}

function verifyFriend(emailOne, emailTwo){
    if(getUser(emailOne) === undefined || getUser(emailTwo) === undefined){
        return false;
    }
    const userOne = getUser(emailOne);
    const userTwo = getUser(emailTwo);

    return userOne.friends.contains(userTwo.email) && userTwo.friends.contains(userOne.email);
}

function removeFriend(emailOne, emailTwo){
    if(verifyFriend(emailOne, emailTwo)){
        const userOne = getUser(emailOne);
        const userTwo = getUser(emailTwo);
        userOne.friends.splice(userOne.friends.indexOf(emailTwo), 1);
        userTwo.friends.splice(userTwo.friends.indexOf(emailOne), 1);
        return true;
    }
    return false;
}

function resetAllUsers(){
    users.clear();
}

function initWithDefaultData(){
    resetAllUsers();
    createUser("a@a.no", "a", "Alexander", "Bredesen", "090998", "Norway", []);
    createUser("foo@bar.no", "a", "Foo", "Bar", "090998", "Norway", []);
    createUser("b@b.no", "a", "b", "b", "090998", "Norway", []);
    addFriend("a@a.no", "foo@bar.no");
}


module.exports = {getUser, getUsers, verifyUser, removeFriend, createUser, addFriend, verifyFriend, resetAllUsers, initWithDefaultData};
