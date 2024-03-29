// https://github.com/arcuri82/web_development_and_api_design
import React from "react";
import { Link, withRouter } from "react-router-dom";
import PostsList from "./post/postsList";


export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                <p>Welcome to my page {loggedIn?(user.email):("")}</p>
                <PostsList user={user} endPoint={"/post"}/>
            </div>
        );
    }
}

export default withRouter(Home);
