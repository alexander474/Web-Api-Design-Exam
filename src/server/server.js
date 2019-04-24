const {app} = require("./app");
const users = require("./db/users");
const posts = require("./db/posts");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    users.initWithDefaultData();
    posts.initWithDefaultData();
    console.log('Started NodeJS server on port ' + port);
});

