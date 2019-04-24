import React from "react";
import { Link, withRouter } from "react-router-dom";
import User from "./user";


export class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }


    displayUser(user){
        return <User user={user}/>;
    }



    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                {loggedIn?this.displayUser(user):null}
            </div>
        );
    }
}

export default withRouter(UserPage);
