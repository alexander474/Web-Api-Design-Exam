import React from 'react';
import { Link, withRouter } from "react-router-dom";
import PostsList from "../post/postsList";


export class User extends React.Component {
    constructor(props) {
        super(props);
    }

    addFriend = async (email) => {
        const payload = {email: email};
        await fetch("/api/friend/", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        this.props.callback();
        this.props.history.push('/');
    };

    removeFriend = async (email) => {
        await fetch("/api/friend/" + email, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        this.props.callback();
    };
    renderNotFriend(){
        const email = this.props.user.email;
        return(
            <div>
                <p>You are not friend with this person and cannot se profile details</p>
                <div className={"btn"} onClick={()=>this.addFriend(email)}>Add friend</div>
            </div>
        );
    }

    renderFriend(){
        const {email, birthDate, country, friends} = this.props.user;
        const isMyProfile = email === this.props.loggedInUser.email;
        return(
            <div>
                {isMyProfile?<Link className={"btn"} to={"/editUser/"+this.props.loggedInUser.id}>Edit</Link>:null}
                {email !== null ? <p>Email: {email}</p> : null}
                {birthDate !== null ? <p>Birth: {birthDate}</p> : null}
                {country !== null ? <p>Country: {country}</p> : null}
                <br/>
                {friends !== null ? (
                    <div>
                        <p>Friends: </p>
                        {friends.map(f => {
                        return (
                            <div key={"key_la"+f}
                                className={"friends_div"}>
                                <p className={"friends_div_email"}>{f}</p>
                                <div
                                    className={"btn friends_div_btn"}
                                    onClick={()=>this.removeFriend(f)}>Remove</div>
                            </div>
                        );
                        })}
                    </div>
                    ) : null}
                {!isMyProfile ? <div className={"btn"} onClick={()=>this.removeFriend(email)}>Remove friend</div>: null}
                <br/>
                <PostsList user={this.props.user} endPoint={"/post/" + email}/>
            </div>
        );
    }

    isFriend (friends, email){
        let friend = false;
        friends.forEach(f => {
            if(f === email) friend = true;
        });
        return friend;
    }


    render() {
        if (this.props.user !== null && this.props.loggedInUser !== null) {
            const {email, firstName, surName, friends} = this.props.user;
            const loggedInUser = this.props.loggedInUser;

            return (
                <div>
                    <h1>{firstName + " " + surName}</h1>
                    {this.isFriend(friends,loggedInUser.email) || email === loggedInUser.email?this.renderFriend():this.renderNotFriend()}
                </div>
            );
        } else {
            return (<div><p>Something went wrong, no user</p></div>)
        }
    };
}

export default withRouter(User);