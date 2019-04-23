import React, {Component} from 'react'
import { Link, withRouter } from "react-router-dom";

class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            menu: props.menu,
            dish: null
        }
    }

    componentDidMount(){
        this.getDishes();
    }

    updateMenuState = (menu) => {
        this.setState({menu})
    };
    updateDishState = (dish) => {
        this.setState({dish})
    };

    getDishes = async () => {
        const response = await fetch('/api/dish');
        const body = await response.json();
        this.updateDishState(body);
    };

    addDish = (dish) => {
        let currentMenu = this.state.menu;
        currentMenu.dishes.push(dish);
        this.updateMenuState(currentMenu);
    };

    removeDish = (dish) => {
        let currentMenu = this.state.menu;
        currentMenu.dishes.map( (d, index) => {
            if(d.id === dish.id){
                currentMenu.dishes.splice(index, 1)
            }
            this.updateMenuState(currentMenu);
        })
    };

    doneMenuChange = async () => {
        const {id, menu} = this.state;
        const payload = {id, dishes: menu};
        await fetch("/api/menu/" + id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        this.props.history.push('/menu')
    };

    menuDishesTable() {
        return (
            <table className={"dishesTable"}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {this.state.menu.dishes.map(d => {
                    return (
                    <tr key={"key_md" + d.id}>
                        <td>
                            {d.id}
                        </td>
                        <td>
                            {d.name}
                        </td>
                        <td>
                            {d.price}
                        </td>
                        <td>
                            <Link className={"btn"} to={"/editDish/"+d.id}>Edit</Link>
                        </td>
                        <td>
                            <div className={"btn"} onClick={()=>this.removeDish(d)}>Remove</div>
                        </td>
                    </tr>
                    );}
                )}
                </tbody>
            </table>
        );
    };


    dishesTable() {
        return (
            <table className={"dishesTable"}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {this.state.dish.map(d => {
                    let exists = false;
                    this.state.menu.dishes.forEach(md =>{
                        if(md.id === d.id) exists = true
                    });
                    if(!exists){
                    return (
                    <tr key={"key_d" + d.id}>
                        <td>
                            {d.id}
                        </td>
                        <td>
                            {d.name}
                        </td>
                        <td>
                            {d.price}
                        </td>
                        <td>
                            <Link className={"btn"} to={"/editDish/"+d.id}>Edit</Link>
                        </td>
                        <td>
                            <div className={"btn"} onClick={()=>this.addDish(d)}>Add</div>
                        </td>
                    </tr>
                    )}}
                )}
                </tbody>
            </table>
        );
    };

    render(){
        const {menu, dish} = this.state;
        const menuIsPresent = menu !== null && menu !== undefined;
        const dishesIsPresent = dish !== null && dish !== undefined;

        return(
            <div>
                <h1>Day: {menuIsPresent?this.state.menu.day:null}</h1>
                {menuIsPresent?this.menuDishesTable():null}
                <br/>
                <div className={"btn"} onClick={() => this.doneMenuChange()}>Done</div>
                <br/>
                {dishesIsPresent?this.dishesTable():null}
                <br/>
                <Link className={"btn"} to={"/addDish"}>Create Dish</Link>
            </div>
        )
    }
}

export default withRouter(Menu)