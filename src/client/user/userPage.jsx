import React from "react";
import { Link, withRouter } from "react-router-dom";
import User from "./user";


export class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        if(this.props.match.params.email !== null){
            this.fetchUser();
        }
    }

    fetchUser = async () => {
        const response = await fetch("/api/friend/"+this.props.match.params.id);
        const body = await response.json();
        this.setState({user: body});
        await this.props.fetchAndUpdateUserInfo();
    };


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
                <div>
                    {this.state.user !== null && loggedIn ?
                        <User callback={this.fetchUser} loggedInUser={user} user={this.state.user}/>
                        : null}
                </div>
        );

    }
}

export default withRouter(UserPage);
