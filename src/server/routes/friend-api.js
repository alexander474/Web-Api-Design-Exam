const express = require('express');
const router = express.Router();
const User = require("../db/users");

router.get("/friend/:email", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.json(User.getUser(req.params["email"]))
});



router.post("/friend", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.json(User.addFriend(req.body.email, req.user.email))
});

router.delete("/friend/:email", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.json(User.removeFriend(req.params["email"], req.user.email))
});

module.exports = router;

