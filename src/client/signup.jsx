import React from 'react';
import { Button, Form, FormGroup, Label, Col} from 'reactstrap';
import {withRouter} from 'react-router-dom'

class SignUp extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: "",
            password: "",
            confirm: "",
            errorMsg: null
        };
    }

    onUserIdChange = (event) => {
        this.setState({userId: event.target.value, errorMsg: null});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value, errorMsg: null});
    };

    onConfirmChange = (event) => {
        this.setState({confirm: event.target.value, errorMsg: null});
    };

    doSignUp = async (e) => {
        e.preventDefault();
        const {userId, password, confirm} = this.state;

        if(confirm !== password){
            this.setState({errorMsg: "Passwords do not match"});
            return;
        }

        const url = "/api/signup";

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


        if(response.status === 400){
            this.setState({errorMsg: "Invalid userId/password"});
            return;
        }

        if(response.status !== 201){
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

        let confirmMsg = "Ok";
        if(this.state.confirm !== this.state.password){
           confirmMsg = "Not matching";
        }

        return(
            <Form onSubmit={(e) => this.doSignUp(e)}>
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
                    <Label for="exampleText" sm={2}>Confirm</Label>
                    <Col sm={10}>
                    <input type="password"
                           value={this.state.confirm}
                           onChange={this.onConfirmChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                    <Label for="exampleText" >{confirmMsg}</Label>
                    </Col>
                    <Col sm={10}>
                        <Label for="exampleText" >{error}</Label>
                    </Col>
                </FormGroup>
            <Button>Submit</Button>
        </Form>
        );
    }
}

export default withRouter(SignUp);
