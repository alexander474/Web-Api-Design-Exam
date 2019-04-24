import React from "react";
import { Link, withRouter } from "react-router-dom";

export class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
    }

    componentDidMount() {
        this.fetchRequests();
    }

    fetchRequests = async () => {
        const response = await fetch("/friend/request");
        const body = await response.json();
        this.setState({requests: body});
    };


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        if(loggedIn) {
            return (
                <div>
                    <ul>
                        {this.state.requests.map(r => {
                           return <li>{r}</li>
                        })}
                    </ul>
                </div>
            );
        }else{
            return <div>Need to login</div>
        }

    }
}

export default withRouter(Request);
