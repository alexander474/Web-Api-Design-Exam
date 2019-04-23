const Dish = require('./dish');
const menus = new Map();

let indexMenu = 0;


function createMenu(dishes){
    const id = indexMenu;
    const menu = {
        id: id,
        dishes: dishes
    };
    menus.set(id, menu);
    indexMenu++;
    return id;
}

function deleteMenu(id){
    return menus.delete(parseInt(id))
}

function updateMenu(id, menu){
    id = parseInt(id);
    menus.set(id, menu);
    return true
}

function getMenu(id){
    return menus.get(parseInt(id));
}

function getMenus(){
    return Array.from(menus.values());
}

function resetAllMenus(){
    menus.clear();
}

function initWithDefaultData(){
    resetAllMenus();
    const dishes = Dish.getDishes();

    createMenu({day:"Monday",dishes:[dishes[0], dishes[1]]});
    createMenu({day:"Tuesday",dishes:[dishes[1]]});
    createMenu({day:"Wednesday",dishes:[]});
    createMenu({day:"Thursday",dishes:[]});
    createMenu({day:"Friday",dishes:[]});
    createMenu({day:"Saturday",dishes:[]});
    createMenu({day:"Sunday",dishes:[]});
}

module.exports = {
    getMenus,
    getMenu,
    createMenu,
    deleteMenu,
    updateMenu,
    initWithDefaultData
};




