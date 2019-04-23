const express = require('express');
const router = express.Router();
const Dish = require("../db/dish");

router.get("/dish", (req, res) => {
    res.send(Dish.getDishes());
});

router.get("/dish/:id", (req, res) => {
    const id = req.params["id"];
    const dish = Dish.getDish(id);

    if (dish === undefined || dish === null) {
        res.status(404);
        res.send()
    } else {
        res.json(dish)
    }
});

router.delete("/dish/:id", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.json(Dish.deleteDish(req.params["id"]))
});

router.post("/dish", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    res.json(Dish.createDish(req.body.name, req.body.price))
});

router.put("/dish/:id", (req, res) => {
    if(! req.user){
        res.status(401).send();
        return;
    }
    const id = req.params["id"];
    const body = req.body;
    const dish = {
        id: body.id,
        name: body.name,
        price: body.price
    };
    res.json(Dish.updateDish(id, dish))
});

module.exports = router;