import React from 'react';
import { Link, withRouter } from "react-router-dom";


export class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            surName: "",
            birthDate: "",
            country: "",
        }
    }

    componentWillMount() {
        if(this.props.user !== null && this.props.user !== undefined){
            const {firstName, surName, birthDate, country} = this.props.user;
            this.setState({
                firstName: firstName,
                surName: surName,
                birthDate: birthDate,
                country: country,
            });
        }
    }


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

    editUser = async () => {
        if(this.props.user !== null && this.state.firstName.length>0&&
        this.state.surName.length>0&&this.state.birthDate.length>0&&
        this.state.country.length>0) {
            const {email, id, friends} = this.props.user;
            const user = {
                email,
                id,
                friends,
                firstName: this.state.firstName,
                surName: this.state.surName,
                birthDate: this.state.birthDate,
                country: this.state.country,
            };
            await fetch("/api/user/"+id, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            this.props.history.push('/user/'+id);
        }
    };



    render() {
        if (this.props.user !== null) {
            return (
                <div>
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
                    <div className="btn" onClick={()=>this.editUser()} id="signUpBtn">Save</div>
                </div>
            );
        } else {
            return (<div><p>Something went wrong, no user</p></div>)
        }
    };
}

export default withRouter(EditUser);