const express = require('express')
const passport = require('passport');

const Menus = require('../db/menus');
const Tokens = require('../ws/tokens');

const router = express.Router();

router.get('/menu', (req, res) => {
    console.log(Menus.getAllMenus());
    res.json(Menus.getAllMenus())
});

router.get('/menu/:weekNum', (req, res) => {
    const menu = Menus.getWeekMenu(req.params["weekNum"]);
    console.log(menu);

    if (menu === undefined || menu === null) {
        res.status(404);
        res.send()
    } else {
        res.json(menu)
    }
});





module.exports = router;
