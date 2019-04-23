import React from "react";
import { Link, withRouter } from "react-router-dom";
import MenusList from "./menusList";

export class Menus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: null,
            errorMsg: null
        }
    }

    componentDidMount() {
        this.fetchMenus();
    }

    fetchMenus = async () => {
        const url = "/api/menu";
        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.updateMenus(null);
            return;
        }

        if (response.status !== 200) {
        } else {
            const payload = await response.json();
            this.updateMenus(payload);
        }
    };

    updateMenus = (menus) => {
        this.setState({menus: menus})
    };

    menuContent() {
        const userId = this.props.user ? this.props.user.userId : null;
        const menus = this.state.menus;
        const menusIsPresent = menus !== null && menus !== undefined;

        if(menusIsPresent){
            return <MenusList menus={menus} userId={userId}/>
        }else{
            return <p>Loading...</p>
        }
    }

    render() {

        return (
            <div>
                {this.menuContent()}
            </div>
        );
    }
}

export default withRouter(Menus);
