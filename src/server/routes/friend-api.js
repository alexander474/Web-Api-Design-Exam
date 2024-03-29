const express = require('express');
const router = express.Router();
const User = require("../db/users");


router.get("/friend/request", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.status(200).json(User.getFriendRequests(req.user.email));
});

router.delete("/friend/request/:email", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    if(req.params["email"]) {
        User.removeFriendRequest(req.user.email, req.params["email"]);
    }
    res.status(200).send();
});

router.get("/friend/:id", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    const user = User.getUserById(req.params["id"]);
    if(verifyFriends(req.user.friends, user.email)) {
        res.json(user)
    }else{
        res.json({
            email: user.email,
            firstName: user.firstName,
            surName: user.surName,
            friends: user.friends
        })
    }
});

function verifyFriends(friends, email){
    if(friends === undefined) return false;
    else if(!(friends instanceof Array)) return false;
    let friend = false;
    friends.forEach(f => {
        if(f === email) friend = true
    });
    return friend
}


router.post("/friend", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    const i = User.sendFriendRequest(req.user.email, req.body.email);
    if(i){
        res.status(200).send();
    }else{
        res.status(404).send();
    }
});

router.post("/friend/add", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    User.removeFriendRequest(req.user.email, req.body.email);
    res.json(User.addFriend(req.body.email, req.user.email))
});

router.delete("/friend/:email", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    if(verifyFriends(req.user.friends, req.params["email"])) {
        res.json(User.removeFriend(req.params["email"], req.user.email))
    }else{
        res.status(404).send();
    }
});

module.exports = router;

