import React, {Component} from 'react'
import { Link, withRouter } from "react-router-dom";


class Dish extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            price: props.price
        }
    }

    editDish = async () => {
        await this.props.callback(
            this.state.name,
            this.state.price
        );

        this.props.history.push('/')
    };

    updateName = (event) => {
        this.setState({name: event.target.value});
    };

    updatePrice = (event) => {
        this.setState({price: event.target.value});
    };

    render(){
        return(
            <div>
                <div>
                    <p>Name:</p>
                    <input type="text"
                           value={this.state.name}
                           onChange={this.updateName}
                           id="userIdInput"
                    />
                </div>
                <div>
                    <p>Price</p>
                    <input type="text"
                           value={this.state.price}
                           onChange={this.updatePrice}
                           id="userIdInput"
                    />
                </div>
                <div className="btn" onClick={this.editDish}>Ok</div>
            </div>
        )
    }

}

export default withRouter(Dish);