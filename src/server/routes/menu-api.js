const express = require('express');
const Menus = require('../db/menus');

const router = express.Router();

router.get('/menu', (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }

    console.log(Menus.getAllMenus());
    res.json(Menus.getAllMenus())
});

router.get('/menu/:id', (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }

    const menu = Menus.getWeekMenu(req.params["id"]);
    console.log(menu);

    if (menu === undefined || menu === null) {
        res.status(404);
        res.send()
    } else {
        res.json(menu)
    }
});

router.put('/menu/:id', (req, res) => {
    if(!req.user){
        res.status(401).send();
        return
    }
    const menu = Menus.alterMenu(weekMenu, req.body.menu);

    if(! menu){
        res.status(400).send();
        return;
    }
});





module.exports = router;
