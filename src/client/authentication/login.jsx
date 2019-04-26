// https://github.com/arcuri82/web_development_and_api_design
import React from 'react';
import {Link, withRouter} from 'react-router-dom';


export class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMsg: null
        };
    }

    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    doLogIn = async () => {
        const {email, password} = this.state;

        const url = "/api/login";

        const payload = {email: email, password: password};

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
            this.setState({errorMsg: "Invalid email/password"});
            return;
        }

        if(response.status !== 204){
            this.setState({errorMsg: "Error when connecting to server: status code "+ response.status});
            return;
        }

        this.setState({errorMsg: null});
        await this.props.fetchAndUpdateUserInfo();
        this.props.history.push('/');
    };


    render(){

        let error = <div></div>;
        if(this.state.errorMsg !== null){
            error = <div className="errorMsg"><p>{this.state.errorMsg}</p></div>
        }


        return(
            <div>
                <div>
                    <p>Email:</p>
                    <input type="text"
                           value={this.state.email}
                           onChange={this.onEmailChange}
                           id="emailInput"
                    />
                </div>
                <div>
                    <p>Password:</p>
                    <input type="password"
                           value={this.state.password}
                           onChange={this.onPasswordChange}
                           id="passwordInput"
                    />
                </div>

                {error}

                <div className="btn" onClick={()=>this.doLogIn()} id="loginBtn">Log In</div>
                <Link to={"/signup"}>Register</Link>
            </div>);
    }
}

export default withRouter(Login);
