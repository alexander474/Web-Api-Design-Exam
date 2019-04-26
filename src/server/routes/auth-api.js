const express = require('express');
const passport = require('passport');

const Users = require('../db/users');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/signup', function(req, res){

    const created = Users.createUser(
        req.body.email,
        req.body.password,
        req.body.firstName,
        req.body.surName,
        req.body.birthDate,
        req.body.country
    );

    if(! created){
        res.status(400).send();
        return;
    }

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
                //shouldn't really happen
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
});

router.post('/logout', function(req, res){

    req.logout();
    res.status(204).send();
});


router.put('/user/:id', function (req, res) {

    if(! req.user){
        res.status(401).send();
        return;
    }
    const id = req.params["id"];
    if(parseInt(id) === parseInt(req.body.id) &&
        parseInt(id) === parseInt(req.user.id) &&
        req.body.email === req.user.email) {

        const newUser = {
            id: req.user.id,
            email: req.user.email,
            password: req.user.password,
            firstName: req.body.firstName,
            surName: req.body.surName,
            birthDate: req.body.birthDate,
            country: req.body.country,
            friends: req.user.friends
        };

        Users.updateUser(newUser);
        res.status(201).send();
    }else{
        res.status(404).send();
    }
});

/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
router.get('/user', function (req, res) {

    if(! req.user){
        res.status(401).send();
        return;
    }

    res.status(200).json({
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.firstName,
        surName: req.user.surName,
        birthDate: req.user.birthDate,
        country: req.user.country,
        friends: req.user.friends
    });
});


module.exports = router;
