import React from 'react';
import { Link, withRouter } from "react-router-dom";
import PostsList from "../post/postsList";

export const User = (props) => {
    if(props.user !== null && props.user !== undefined) {
        const {email, firstName, surName, birthDate, country} = props.user;

        return (
            <div>
                <h1>{firstName+" "+surName}</h1>
                {email !== null ?<p>Email: {email}</p>:null}
                {birthDate !== null ?<p>Birth: {birthDate}</p>:null}
                {country !== null ?<p>Country: {country}</p>:null}
                <br/>
                <PostsList user={props.user} endPoint={"/post/"+email}/>
            </div>
        );
    }else{
        return(<div><p>Something went wrong, no user</p></div>)
    }
};

export default withRouter(User);