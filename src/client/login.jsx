import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Col, Form, FormGroup, Label} from "reactstrap";


class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: "",
            password: "",
            errorMsg: null
        };
    }

    onUserIdChange = (event) =>{
        this.setState({userId: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    doLogin = async (e) => {
        e.preventDefault();
        const {userId, password} = this.state;

        const url = "/api/login";

        const payload = {userId: userId, password: password};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: "+ err});
            return;
        }


        if(response.status === 401){
            this.setState({errorMsg: "Invalid userId/password"});
            return;
        }

        if(response.status !== 204){
            this.setState({errorMsg: "Error when connecting to server: status code "+ response.status});
            return;
        }

        this.setState({errorMsg: null});
        this.props.updateLoggedInUserId(userId);
        this.props.history.push('/');
    };

    render(){

        let error = "";
        if(this.state.errorMsg !== null){
            //TODO css
            error = this.state.errorMsg
        }


        return(
            <Form onSubmit={(e) => this.doLogin(e)}>
                <FormGroup row>
                    <Label for="exampleText" sm={2}>username</Label>
                    <Col sm={10}>
                        <input type="text"
                               name="state"
                               id="exampleState"
                               value={this.state.userId}
                               onChange={this.onUserIdChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleText" sm={2}>password</Label>
                    <Col sm={10}>
                        <input type="password"
                               value={this.state.password}
                               onChange={this.onPasswordChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                        <Label for="exampleText" >{error}</Label>
                    </Col>
                </FormGroup>
                <Button>Login</Button>
            </Form>
        );
    }
}

export default withRouter(Login);
