const express_ws = require('express-ws');


let ews;

let messages = [];
let messageCount = 0;

function init(app) {
    console.log("Setting up ws");

    ews = express_ws(app);

    app.ws('/', function (socket, req) {
        console.log('Established a new WS connection');
        socket.send(JSON.stringify(messages));
        socket.on('message', fromClient => {
           const dto = JSON.parse(fromClient);
           const id = messageCount++;
           const msg = {id: id, author: dto.author, text: dto.text};
           messages.push(msg);
           ews.getWss().clients.forEach((client) => {
                   client.send(JSON.stringify([msg]))
           })
        });
    });
}


module.exports = {init};