const chats = new Map();

let chatCounter = 0;


function createChat(emailOne, emailTwo) {
    const id = chatCounter;

    const chat = {
        id: id,
        emailOne: emailOne,
        emailTwo: emailTwo,
        chat: []
    };

    chats.set(id, chat);
    chatCounter++;
    return chat;
}

function getChat(emailOne, emailTwo){
    let chat = null;
    chats.forEach(c => {
        if((c.emailOne===emailOne&&c.emailTwo===emailTwo)||
            (c.emailTwo===emailOne&&c.emailOne===emailTwo)) {
            chat = c;
        }
    });
    return chat;
}

function getUserChats(email){
    let userChats = [];
    chats.forEach(c => {
        console.log(c.emailOne+" : "+c.emailTwo+" = "+email);
        if(c.emailOne===email||c.emailTwo===email){
            userChats.push(c);
        }
    });
    return userChats.filter((element, pos, arr) => {
        return arr.indexOf(element) === pos;
    });
}

function addMessageToChat(id, message){
    const chat = chats.get(id);
    chat.chat.push(message);
    chats.set(id, chat);
}

function createMessage(emailFrom, emailTo, text) {
    let chat = getChat(emailFrom,emailTo);
    if(chat === null){
        console.log("Creating chat: "+emailFrom+" <-> "+emailTo);
        chat = createChat(emailFrom,emailTo)
    }

    const message = {
        id: chat.id,
        emailFrom: emailFrom,
        emailTo: emailTo,
        text: text
    };
    addMessageToChat(chat.id, message);
    return chat.id;
}

function resetAllChats(){
    chats.clear();
}

function initWithDefaultData(){
    resetAllChats();
    createMessage("a@a.no", "foo@bar.no", "Hey");
    createMessage("foo@bar.no", "a@a.no", "Hey back!");
}


module.exports = {createMessage, getChat, getUserChats, initWithDefaultData};
