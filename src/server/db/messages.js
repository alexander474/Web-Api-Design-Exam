
const messages =  [];

let messageCounter = 0;

function createMessage(emailFrom, emailTo, text){
    const id = messageCounter;
    const message = {
        id: id,
        emailFrom: emailFrom,
        emailTo: emailTo,
        text: text
    };
    messages.push(message);
    messageCounter++;
    return message;
}

function getUserMessage(email) {
    let currentMessages = [];
    messages.forEach(m => {
        if(m.emailFrom===email||m.emailTo===email){
            currentMessages.push(m);
        }
    });
    return currentMessages;
}


function resetAllChats(){
    chats.clear();
}

function initWithDefaultData(){
    createMessage("a@a.no", "foo@bar.no", "Hey");
    createMessage("foo@bar.no", "a@a.no", "Hey back!");
    createMessage("b@b.no", "a@a.no", "Hey From B");
}


module.exports = {createMessage, getUserMessage, initWithDefaultData};
