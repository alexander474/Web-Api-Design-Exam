import React from "react";
import { Link, withRouter } from "react-router-dom";
import User from "./user";


export class PrivateUserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;
        return (
            <div>
                {loggedIn ? <User callback={this.props.fetchAndUpdateUserInfo} loggedInUser={user} user={user}/> : null}
            </div>
        );

    }
}

export default withRouter(PrivateUserPage);
