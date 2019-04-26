// https://github.com/arcuri82/web_development_and_api_design
import React from 'react';
import {withRouter} from 'react-router-dom'

export class SignUp extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            firstName: "",
            surName: "",
            birthDate: "",
            country: "",
            password: "",
            confirm: "",
            errorMsg: null
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value, errorMsg: null});
    };

    onFirstNameChange = (event) => {
        this.setState({firstName: event.target.value, errorMsg: null});
    };

    onSurNameChange = (event) => {
        this.setState({surName: event.target.value, errorMsg: null});
    };

    onBirthDateChange = (event) => {
        this.setState({birthDate: event.target.value, errorMsg: null});
    };

    onCountryChange = (event) => {
        this.setState({country: event.target.value, errorMsg: null});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value, errorMsg: null});
    };

    onConfirmChange = (event) => {
        this.setState({confirm: event.target.value, errorMsg: null});
    };

    doSignUp = async () => {

        const {email, firstName, surName, birthDate, country, password, confirm} = this.state;

        if(confirm !== password){
            this.setState({errorMsg: "Passwords do not match"});
            return;
        }

        const url = "/api/signup";

        const payload = {
            email: email,
            firstName: firstName,
            surName: surName,
            birthDate: birthDate,
            country: country,
            password: password,
        };

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
        await this.props.fetchAndUpdateUserInfo();
        this.props.history.push('/');
    };

    render(){

        let error = <div></div>;
        if(this.state.errorMsg !== null){
            error = <div className="errorMsg"><p>{this.state.errorMsg}</p></div>
        }

        let confirmMsg = "Ok";
        if(this.state.confirm !== this.state.password){
            confirmMsg = "Not matching";
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
                    <p>Firstname:</p>
                    <input type="text"
                           value={this.state.firstName}
                           onChange={this.onFirstNameChange}
                           id="firstNameInput"
                    />
                </div>
                <div>
                    <p>Surname:</p>
                    <input type="text"
                           value={this.state.surName}
                           onChange={this.onSurNameChange}
                           id="surNameInput"
                    />
                </div>
                <div>
                    <p>Birthday:</p>
                    <input type="text"
                           value={this.state.birthDate}
                           onChange={this.onBirthDateChange}
                           id="birthDateInput"
                    />
                </div>
                <div>
                    <p>Country:</p>
                    <input type="text"
                           value={this.state.country}
                           onChange={this.onCountryChange}
                           id="countryInput"
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
                <div>
                    <p>Confirm:</p>
                    <input type="password"
                           value={this.state.confirm}
                           onChange={this.onConfirmChange}
                           id="confirmInput"
                    />
                    <div>{confirmMsg}</div>
                </div>

                {error}

                <div className="btn" onClick={this.doSignUp} id="signUpBtn">Sign Up</div>
            </div>
        );
    }
}

export default withRouter(SignUp);

