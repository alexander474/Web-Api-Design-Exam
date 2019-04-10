
// ID is the number of week
const weekMenus = new Map();

let counter = 0;

/**
 * @param weekNum
 * @returns {any[]} of each day's dish
 */
function getWeekMenu(id){
    return weekMenus.get(id);
}

function getWeekMenuByWeekNum(weekNum){
    return searchForWeekNum(weekNum);
}

/**
 * @returns Array of all of the weeks meal plans
 */
function getAllMenus(){
    return Array.from(weekMenus)
}

function searchForWeekNum(weekNum){
    for(const [key, value] of weekMenus){
        if(value.weekNum === weekNum) {
            return value
        }
    }
}

/**
 *
 * @param weekNum INT
 * @param menu Array
 * @returns {boolean} if the weeks menu is created
 */
function createWeekMenu(weekNum, menu){
    if(getWeekMenuByWeekNum(menu.weekNum) !== undefined){
        return false
    }
    const id = counter;
    counter++;

    const weekMenu = {
        id: id,
        weekNum: weekNum,
        menu: menu
    };

    weekMenus.set(id, weekMenu);
    return true;
}

function alterMenu(id, menu){
    if(getWeekMenu(id) !== undefined || getWeekMenuByWeekNum(menu.weekNum) !== undefined) {
        weekMenus.set(id, menu);
        return true;
    }
}


function resetAllMenus(){
    weekMenus.clear();
}

function initWithDefaultData(){
    resetAllMenus();
    exampleMenus.forEach( m => {
        createWeekMenu(m.weekNum, m.menu);
    });
}
const exampleMenus = [
    {
        weekNum: 1,
        menu: [
            {day: "monday", name: "burger", price: 50},
            {day: "tuesday", name: "burger", price: 50},
            {day: "wednesday", name: "burger", price: 50},
            {day: "thursday", name: "burger", price: 50},
            {day: "friday", name: "burger", price: 50},
            {day: "saturday", name: "burger", price: 50},
            {day: "sunday", name: "burger", price: 50}
        ]
    },
    {
        weekNum: 2,
        menu: [
            {day: "monday", name: "fish", price: 50},
            {day: "tuesday", name: "fish", price: 50},
            {day: "wednesday", name: "fish", price: 50},
            {day: "thursday", name: "fish", price: 50},
            {day: "friday", name: "fish", price: 50},
            {day: "saturday", name: "fish", price: 50},
            {day: "sunday", name: "fish", price: 50}
        ]
    },
    {
        weekNum: 3,
        menu: [
            {day: "monday", name: "pizza", price: 50},
            {day: "tuesday", name: "pizza", price: 50},
            {day: "wednesday", name: "pizza", price: 50},
            {day: "thursday", name: "pizza", price: 50},
            {day: "friday", name: "pizza", price: 50},
            {day: "saturday", name: "pizza", price: 50},
            {day: "sunday", name: "pizza", price: 50}
        ]
    }

];



module.exports = {getWeekMenu, getWeekMenuByWeekNum, createWeekMenu, alterMenu, resetAllMenus, initWithDefaultData, getAllMenus};
