import React from 'react';
import { Link, withRouter } from "react-router-dom";
import PostsList from "../post/postsList";

export const User = (props) => {
    if(props.user !== null && props.user !== undefined) {
        const {email, firstName, surName, birthDate, country} = props.user;

        return (
            <div>
                <h1>{firstName+" "+surName}</h1>
                <p>Email: {email}</p>
                <p>Birth: {birthDate}</p>
                <p>Country: {country}</p>
                <br/>
                <PostsList user={props.user} endPoint={"/post/"+email}/>
            </div>
        );
    }else{
        return(<div><p>Something went wrong, no user</p></div>)
    }
};

export default withRouter(User);