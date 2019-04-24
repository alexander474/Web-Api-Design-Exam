const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const authApi = require('./routes/auth-api');
const friendApi = require('./routes/friend-api');
const searchApi = require('./routes/search-api');
const Users = require('./db/users');

const WsHandler = require('./ws/ws-handler');


const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

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
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {

        const ok = Users.verifyUser(email, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid email/password'});
        }

        const user = Users.getUser(email);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {

    const user = Users.getUser(email);

    if (user !== null) {
        done(null, user);
    } else {
        done(null, false);
    }
});



//--- Routes -----------
WsHandler.init(app);
app.use('/api', authApi);
app.use('/api', friendApi);
app.use('/api', searchApi);

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
