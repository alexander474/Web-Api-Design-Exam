import React, {Component} from 'react'
import { Link, withRouter } from "react-router-dom";

import Dish from './dish'

class AddDish extends Component {

    constructor(props){
        super(props)
    }

    addDish = async (name, price) => {

        const payload = {name, price: price};
        const response = await fetch("/api/dish", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        this.props.history.push('/')
    };

    render(){
        return(
            <div>
                <Dish callback={this.addDish}/>
            </div>
        )
    }
}

export default withRouter(AddDish);