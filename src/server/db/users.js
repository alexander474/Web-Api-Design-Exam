// Used from teachers github repo

const users = new Map();


function getUser(email){

    return users.get(email);
}

function verifyUser(email, password){

    const user = getUser(email);

    if(user === undefined){
        return false;
    }

    return user.password === password;
}

function createUser(email, password, firstName, surName, birthDate, country){
    if(getUser(email) !== undefined ){
        return false;
    }

    const user = {
        email: email,
        password: password,
        firstName: firstName,
        surName: surName,
        birthDate: birthDate,
        country: country
    };

    users.set(email, user);
    return true;
}

function resetAllUsers(){
    users.clear();
}

function initWithDefaultData(){
    resetAllUsers();
    createUser("a@a.no", "a", "Alexander", "Bredesen", "090998", "Norway");
}


module.exports = {getUser, verifyUser, createUser, resetAllUsers, initWithDefaultData};
