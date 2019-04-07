import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from 'reactstrap';
import MenuItem from "./menuItem"

class WeekMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: props.menu,
        };
    }


    render() {
        console.log(this.state.menus);
        let display = "";
        if(this.state.menu !== null && this.state.menu !== undefined){
            display = this.state.menu.map((m, i)=>{
                return (<MenuItem key={i} day={m.day} name={m.name} price={m.price} />)
            })
        }

        return (
            <div>
                 {display}
            </div>
        );
    }
}

export default withRouter(WeekMenu);




