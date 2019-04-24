const {app} = require("./app");
const users = require("./db/users");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    users.initWithDefaultData();
    console.log('Started NodeJS server on port ' + port);
});

