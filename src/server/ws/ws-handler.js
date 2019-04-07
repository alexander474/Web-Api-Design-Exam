const express_ws = require('express-ws');
const WebSocket = require('ws');
const Tokens = require('./tokens');


let ews;

function init(app) {
    console.log("Setting up ws");

    ews = express_ws(app);
    let counter = 0;
    const messages = [];

    app.ws('/', function (socket, req) {
        console.log('Established a new WS connection');

        socket.messageHandlers = new Map();
        socket.addMessageHandler = (topic, handler) => {socket.messageHandlers.set(topic, handler)};
        socket.addMessageHandler("login", handleLogin);

        ws.send(JSON.stringify(messages));

        socket.on('message', (data) => {
            console.log("Getting message"+JSON.stringify(data));

            const dto = JSON.parse(data);
            const id = counter++;
            const msg = {id: id, userId: dto.userId, text: dto.text};

            //add to our current local store
            messages.push(msg);

            //do a broadcast to all existing clients
            ews.getWss().clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {

                    client.send(JSON.stringify([msg]));
                }
            });
        });

        socket.on('close', () => {

            console.log("User '" + userId + "' is disconnected.");
        });
    });
}

function handleLogin(dto, socket) {

    const token = dto.wstoken;

    if (token === null || token === undefined) {
        socket.send(JSON.stringify({topic: "update", error: "Missing token"}));
        return;
    }

    const userId = Tokens.consumeToken(token);

    if (userId === null || userId === undefined) {
        socket.send(JSON.stringify({topic: "update", error: "Invalid token"}));
        return;
    }


    console.log("User '" + userId + "' is now connected with a websocket.");
}


module.exports = {init};