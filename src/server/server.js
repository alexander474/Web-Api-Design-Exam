const {app} = require("./app");
const menus = require("./db/menus");
const dishes = require("./db/dish");
const users = require("./db/users");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    dishes.initWithDefaultData();
    menus.initWithDefaultData();
    users.initWithDefaultData();
    console.log('Started NodeJS server on port ' + port);
});

