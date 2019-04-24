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
        const response = await fetch("api/friend/request");
        const body = await response.json();
        this.setState({requests: body});
    };

    addFriend = async (email) => {
        const payload = {email: email};
        await fetch("/api/friend/add", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        await this.fetchRequests();
        await this.props.fetchAndUpdateUserInfo();
    };


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        if(loggedIn) {
            return (
                <div>
                    <ul>
                        {this.state.requests.map((r,i) => {
                           return <li key={"key_"+r+(i%2)}>{r} <div className={"btn friends_div_btn"} onClick={()=>this.addFriend(r)}>Add</div></li>
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
