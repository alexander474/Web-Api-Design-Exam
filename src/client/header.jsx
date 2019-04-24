import React from "react";
import { Link, withRouter } from "react-router-dom";

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, { method: "post" });
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 204) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    };

    renderLoggedIn(user) {
        return (
            <div className="msgDiv">
                <Link className="btn" to="/chat">
                    Chat
                </Link>
                <Link className="btn" to="/user">
                    {user.firstName}
                </Link>
                <div className="btn btnPartHeader" onClick={()=>this.doLogout()} id="logoutBtnId">
                    Logout
                </div>
            </div>
        );
    }

    renderNotLoggedIn() {
        return (
            <div className="msgDiv">
                <div className="btnPartHeader">
                    <Link className="btn" to="/chat">
                        Chat
                    </Link>
                    <Link className="btn" to="/login">
                        LogIn
                    </Link>
                    <Link className="btn" to="/signup">
                        SignUp
                    </Link>
                </div>
            </div>
        );
    }

    render() {
        const user = this.props.user!==null? this.props.user : null;

        let content;
        if (user === null) {
            content = this.renderNotLoggedIn();
        } else {
            content = this.renderLoggedIn(user);
        }

        return (
            <div className={"headerBar"}>
                <Link className="btn btn_home" to={"/"}>
                    Home
                </Link>
                {content}
            </div>
        );
    }
}

export default withRouter(Header);
