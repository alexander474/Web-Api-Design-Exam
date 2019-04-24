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
        const copy = {
            id: currentUser.id,
            email: currentUser.email,
            firstName: currentUser.firstName,
            surName: currentUser.surName,
            birthDate: currentUser.birthDate,
            country: currentUser.country
        };

        if(currentUser.firstName.includes(search) ||
            currentUser.surName.includes(search) ||
            currentUser.email.includes(search) ||
            currentUser.country.includes(search)){
            match = true;
        }
        if(!foundUsers.includes(copy) && currentUser !== req.user && match === true) {
            foundUsers.push(copy)
        }
    }
    res.send(JSON.stringify(foundUsers));
});

module.exports = router;
