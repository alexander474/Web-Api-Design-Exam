const dishes = new Map();

let indexDish = 0;

function createDish(name, price) {
    const id = indexDish;
    const dish = {
        id: id,
        name: name,
        price: price
    };

    dishes.set(id, dish);
    indexDish++;
    return id;
}

function deleteDish(id){
    return dishes.delete(parseInt(id))
}

function updateDish(id, dish){
    id = parseInt(id);
    if(getDish(id)) {
        dishes.set(id, dish);
        return true;
    }
    return false;
}

function  getDish(id) {
    return dishes.get(parseInt(id))
}

function getDishes(){
    return Array.from(dishes.values())
}

function resetAllDishes(){
    dishes.clear();
}

function initWithDefaultData(){
    resetAllDishes();
    createDish("Pizza", 249);
    createDish("Taco", 189);
    createDish("Pasta", 199);
}

module.exports = {
    getDishes,
    getDish,
    createDish,
    deleteDish,
    updateDish,
    resetAllDishes,
    initWithDefaultData
};