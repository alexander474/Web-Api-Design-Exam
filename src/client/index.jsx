import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Home} from "./home";
import Login from "./login";
import SignUp from "./signup";
import Header from "./header";
import Chat from './Chat/chat';
import Menu from './Menu/menu';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null
        };
    }

    componentDidMount(){
        this.checkIfAlreadyLoggedIn();
    }


    async checkIfAlreadyLoggedIn() {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.updateLoggedInUserId(null);
            return;
        }

        if (response.status !== 200) {
        } else {
            const payload = await response.json();
            this.updateLoggedInUserId(payload.userId);
        }
    };

    updateLoggedInUserId = (userId) => {
        this.setState({userId: userId});
    };


    notFound() {
        return (
            <Row>
                <Col sm="12">
                    <h2>NOT FOUND: 404</h2>
                    <p>
                        ERROR: the page you requested in not available.
                    </p>
                </Col>
            </Row>
        );
    };


    render() {

        return (
            <BrowserRouter>
                <div>
                    <Header userId={this.state.userId}
                            updateLoggedInUserId={this.updateLoggedInUserId}/>

                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       userId={this.state.userId}
                                                       updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        userId={this.state.userId}
                                                        updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/chat"
                               render={props => <Chat {...props}
                                                        userId={this.state.userId}
                                                        updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/menu"
                               render={props => <Menu {...props}
                                                      userId={this.state.userId}
                                                      updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props} userId={this.state.userId}/>}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
