// ID is the number of week
const weekMenu = new Map();

/**
 * @param weekNum
 * @returns Array of each day's dish
 */
function getWeekMenu(weekNum){
    return weekMenu.get(weekNum);
}

/**
 *
 * @returns Array of all of the weeks meal plans
 */
function getAllMenus(){
    return Array.from(weekMenu.values());
}

/**
 *
 * @param weekNum INT
 * @param menu Array
 * @returns {boolean} if the weeks menu is created
 */
function createWeekMenu(weekNum, menu){
    if(getWeekMenu(weekNum) !== undefined){
        return false
    }
    weekMenu.set(weekNum, menu);
    return true;
}

function alterMenu(weekNum, menu){
    weekMenu.set(weekNum, menu);
    return true;
}

function resetAllMenus(){
    weekMenu.clear();
}

function initWithDefaultData(){
    resetAllMenus();
    const weakNum = 1;
    const menu = [
        {day: "monday", name: "burger", price: 50},
        {day: "tuesday", name: "burger", price: 50},
        {day: "wednesday", name: "burger", price: 50},
        {day: "thursday", name: "burger", price: 50},
        {day: "friday", name: "burger", price: 50},
        {day: "saturday", name: "burger", price: 50},
        {day: "sunday", name: "burger", price: 50}
    ];
    createWeekMenu(weakNum, menu);
}


module.exports = {getWeekMenu, createWeekMenu, alterMenu, resetAllMenus, initWithDefaultData, getAllMenus};
