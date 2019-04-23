import React, {Component} from 'react'
import { Link, withRouter } from "react-router-dom";

import Dish from './dish'

class EditDish extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            price: ""
        };
    }

    async componentDidMount(){
        if(this.props.user === null){
            this.props.history.push('/');
        }
        this.fetchDish();
    }

    fetchDish = async () => {
        const response = await fetch("/api/dish/" + this.state.id);
        const body = await response.json();
        this.updateName(body.name);
        this.updatePrice(body.price);
    };

    editDish = async (name,price) => {
        const id = this.state.id;
        const payload = {id, name, price};
        await fetch("/api/dish/" + id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        this.props.history.goBack();
    };

    updateName = (name) => {
        this.setState({name});
    };

    updatePrice = (price) => {
        this.setState({price});
    };


    render(){
        return(
            <div>
                <Dish
                    name={this.state.name}
                    price={this.state.price}
                    callback={this.editDish}/>
            </div>
        )
    }
}

export default withRouter(EditDish);
