import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import {Home} from "./home";
import Login from "./authentication/login";
import SignUp from "./authentication/signup";
import Header from "./header";
import UserPage from "./user/userPage";
import PrivateUserPage from "./user/privateUserPage";
import Requests from "./user/requests";
import Chat from "./chat/chat";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            errorMsg: null
        };
    }

    componentDidMount() {
        this.fetchAndUpdateUserInfo();
    }


    fetchAndUpdateUserInfo = async () => {
        const url = "/api/user";
        let response;

        try {
            response = await fetch(url, {
                method: "get",
                credentials: 'include',
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    };


    updateLoggedInUser = (user) => {
        this.setState({user: user});
    };


    notFound() {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );
    };


    render() {

        return (
            <BrowserRouter>
                <div>
                    <Header user={this.state.user}
                            updateLoggedInUser={this.updateLoggedInUser}/>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/user"
                               render={props => <PrivateUserPage {...props}
                                                      user={this.state.user}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/user/:id"
                               render={props => <UserPage {...props}
                                                          user={this.state.user}
                                                          fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/requests"
                               render={props => <Requests {...props}
                                                                 user={this.state.user}
                                                                 fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/chat"
                               render={props => <Chat {...props}
                                                       user={this.state.user}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      user={this.state.user}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
