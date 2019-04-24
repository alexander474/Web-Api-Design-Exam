const express = require('express');
const router = express.Router();
const User = require("../db/users");

router.get("/search/:key", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    const search = req.params["key"];
    const users = User.getUsers();
    const foundUsers = [];
    for(let i=0; i<users.length; i++) {
        let currentUser = users[i];
        let match = false;
        for (let key in currentUser) {
            if (currentUser[key].indexOf(search) !== -1){
                match = true;
            }
        }
        const copy = {
            email: currentUser.email,
            firstName: currentUser.firstName,
            surName: currentUser.surName,
            birthDate: currentUser.birthDate,
            country: currentUser.country
        };
        if(!foundUsers.includes(copy) && match === true) {
            foundUsers.push(copy)
        }
    }
    res.send(JSON.stringify(foundUsers));
});

module.exports = router;
