const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const authApi = require('./routes/auth-api');
const menuApi = require('./routes/menu-api');
const Users = require('./db/users');

const WsHandler = require('./ws/ws-handler');


const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

WsHandler.init(app);



app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user !== null) {
        done(null, user);
    } else {
        done(null, false);
    }
});



//--- Routes -----------
app.use('/api', authApi);
app.use('/api', menuApi);

//handling 404 for /api calls
app.all('/api*', (req,res) => {
    res.status(404);
    res.send();
});

//handling 404 for all others
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {app};
