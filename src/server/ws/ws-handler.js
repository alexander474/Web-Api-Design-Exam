const express_ws = require('express-ws');


let ews;

function init(app) {
    console.log("Setting up ws");

    ews = express_ws(app);

    app.ws('/', function (socket, req) {
        console.log('Established a new WS connection');

        broadcastCount();

        socket.on('close', () => {
            broadcastCount();
            console.log("User '" + userId + "' is disconnected.");
        });
    });
}

function broadcastCount() {
    const n = ews.getWss().clients.size;

    ews.getWss().clients.forEach((client) => {

        const data = JSON.stringify({userCount: n});

        client.send(data);
    });
}

module.exports = {init};