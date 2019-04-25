const express_ws = require('express-ws');
const Posts = require('../db/posts');
const Messages = require('../db/messages');


let ews;

let messages = [];
let messageCount = 0;
let connections = new Map();

function init(app) {
    console.log("Setting up ws");

    ews = express_ws(app);

    app.ws('/message', function (socket, req) {
        if (!req.user) {
            socket.status(401).send();
            return;
        }
        connections.set(req.user.email, socket);
        console.log('Established a new WS message connection');
        socket.send(JSON.stringify(Messages.getUserMessage(req.user.email)));
        socket.on('message', fromClient => {
            const dto = JSON.parse(fromClient);
            const created = Messages.createMessage(dto.emailFrom, dto.emailTo, dto.text);
            const receiver = connections.get(dto.emailTo);
            if(receiver) {
                receiver.send(JSON.stringify([created]));
            }
                socket.send(JSON.stringify([created]));
        });
    });

    app.ws('/post', function (socket, req) {
        if(! req.user){
            socket.status(401).send();
            return;
        }
        console.log('Established a new WS posts connection');
        connections.set(req.user.email, socket);
        socket.send(JSON.stringify(Posts.getUserAndFriendsPost(req.user)));
        socket.on('message', fromClient => {
            const dto = JSON.parse(fromClient);
            const created = Posts.createPost(dto);
            if(created) {
                socket.send(JSON.stringify([dto]));
                req.user.friends.forEach(friend => {
                    if(connections.get(friend)) {
                        const connection = connections.get(friend);
                        if (connection) {
                            connection.send(JSON.stringify([dto]));
                        }
                    }
                });
            }
        });
    });

    app.ws('/post/:email', function (socket, req) {
        const email = req.params["email"];
        if(! req.user && req.user.email !== email){
            socket.status(401).send();
            return;
        }
        console.log('Established a new WS personal posts connection');
        socket.send(JSON.stringify(Posts.getUserPosts(req.user.email)));
        socket.on('message', fromClient => {
            const dto = JSON.parse(fromClient);
            const created = Posts.createPost(dto);
            if(created) {
                socket.send(JSON.stringify([dto]));
                req.user.friends.forEach(friend => {
                    if(connections.get(friend)) {
                        const connection = connections.get(friend);
                        if (connection) {
                            connection.send(JSON.stringify([dto]));
                        }
                    }
                });
            }
        });
    });
}


module.exports = {init};