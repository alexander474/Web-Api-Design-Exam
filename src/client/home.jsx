import React from "react";
import {Link} from "react-router-dom";


export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                {loggedIn ? (
                    <div>
                        <p>Homepage & you are logged in</p>
                    </div>
                ) : (
                    <p>
                        You need to log-in to start playing!
                    </p>
                )}

            </div>
        );
    }
}
