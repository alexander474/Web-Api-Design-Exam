const express = require('express');
const router = express.Router();
const Menus = require('../db/menus');


router.get('/menu', (req, res) => {

    res.json(Menus.getMenus())
});

router.get('/menu/:id', (req, res) => {

    const menu = Menus.getMenu(req.params["id"]);
    console.log(menu);

    if (menu === undefined || menu === null) {
        res.status(404);
        res.send()
    } else {
        res.json(menu)
    }
});

router.delete("/menu/:id", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.json(Menus.deleteMenu(req.params["id"]));
});

router.post("/menu", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.json(Menus.createMenu(req.body.dishes));
});

router.put("/menu/:id", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    const id = req.params["id"];
    const body = req.body;
    const menu = {
        id: body.id,
        day: body.day,
        dishes: body.dishes
    };
    res.json(Menus.updateMenu(id, menu))
});

module.exports = router;
