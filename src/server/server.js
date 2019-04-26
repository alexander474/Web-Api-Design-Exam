// https://github.com/arcuri82/web_development_and_api_design
const {app} = require("./app");
const users = require("./db/users");
const posts = require("./db/posts");
const messages = require("./db/messages");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    users.initWithDefaultData();
    posts.initWithDefaultData();
    messages.initWithDefaultData();
    console.log('Started NodeJS server on port ' + port);
});

