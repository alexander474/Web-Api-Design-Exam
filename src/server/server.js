const {app} = require("./app");
const menus = require("./db/menus");
const users = require("./db/users");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    menus.initWithDefaultData();
    users.initWithDefaultData();
    console.log('Started NodeJS server on port ' + port);
});

