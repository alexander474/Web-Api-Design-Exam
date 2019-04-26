// https://github.com/arcuri82/web_development_and_api_design
import React from "react";
import { Link, withRouter } from "react-router-dom";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchResult: []
        }
    }

    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, { method: "post" });
        } catch (err) {
            //alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 204) {
            //alert("Error when connecting to server: status code " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    };

    fetchSearch = async () => {
      const response = await fetch("api/search/"+this.state.search);
      const body = await response.json();
      this.setSearchResult(body);
    };

    setSearchResult = (searchResult) => {
        this.setState({searchResult})
    };

    onSearchChange = (e) => {
        this.setState({search: e.target.value});
        if(this.state.search && this.state.search.length > 1) {
            this.fetchSearch();
        }
    };



    renderLoggedIn(user) {
        return (
            <div className="msgDiv">
                <div>
                    <input type="text"
                           id="searchInputId"
                           className="inputName"
                           value={this.state.search}
                           onChange={this.onSearchChange}/>
                           <div>
                            {this.state.searchResult.length>0?(
                                <ul>
                                    {this.state.searchResult.map((u,i) => {
                                        return <li  key={"key_kk"+i%2}><Link to={"/user/"+u.id}>{u.firstName+" "+u.surName}</Link></li>
                                    })}
                                </ul>
                            ):null}
                           </div>
                </div>
                <Link className="btn" to="/chat">
                    Chat
                </Link>
                <Link className="btn" to="/user">
                    {user.firstName}
                </Link>
                <Link className="btn" to="/requests">
                    Requests
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
                    <p className="notLoggedInText">Not logged in</p>
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
