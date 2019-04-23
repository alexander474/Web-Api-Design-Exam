import React, {Component} from 'react'
import { Link, withRouter } from "react-router-dom";
import Menu from './menu'

class EditMenu extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            menu: null
        };
    }


    componentDidMount() {
        if(this.props.user === null){
            this.props.history.push('/');
        }
        this.fetchMenu();
    };

    fetchMenu = async () => {
        const response = await fetch("/api/menu/" + this.state.id);
        const body = await response.json();
        this.updateMenu(body.dishes);
    };

    updateMenu = (menu) => {
      this.setState({menu})
    };

    render(){

        if(this.state.menu !== null && this.state.menu !== undefined){
            return(
                <div>
                    <Menu
                        id={this.state.id}
                        menu={this.state.menu}/>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}

export default withRouter(EditMenu);