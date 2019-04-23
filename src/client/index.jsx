import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import {Home} from "./home";
import Login from "./authentication/login";
import SignUp from "./authentication/signup";
import Header from "./header";
import Menus from "./menu/menus";
import Chat from "./chat/chat";
import AddDish from './dish/addDish'
import EditDish from './dish/editDish'
import EditMenu from './menu/editMenu'

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
                        <Route exact path="/menu"
                               render={props => <Menus {...props}
                                                        user={this.state.user}
                                                        fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/editMenu/:id"
                               render={props => <EditMenu {...props}
                                                       user={this.state.user}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/editDish/:id"
                               render={props => <EditDish {...props}
                                                       user={this.state.user}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/addDish"
                               render={props => <AddDish {...props}
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
