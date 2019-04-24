const express_ws = require('express-ws');
const Posts = require('../db/posts');


let ews;

let messages = [];
let messageCount = 0;

function init(app) {
    console.log("Setting up ws");

    ews = express_ws(app);

    app.ws('/message', function (socket, req) {
        console.log('Established a new WS message connection');
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

    app.ws('/post', function (socket, req) {
        if(! req.user){
            socket.status(401).send();
            return;
        }


        console.log('Established a new WS posts connection');
        socket.send(JSON.stringify(Posts.getUserAndFriendsPost(req.user)));
        socket.on('message', fromClient => {
            Posts.createPost(JSON.parse(fromClient));
            ews.getWss().clients.forEach((client) => {
                console.log(client.user);
                //client.send(JSON.stringify([msg]))
            })
        });
    });
}


module.exports = {init};