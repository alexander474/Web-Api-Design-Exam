import React from "react";
import { Link, withRouter } from "react-router-dom";

export class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: null,
            title: "",
            text: "",
            posts: null,
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    componentWillUnmount() {
        this.socket.close();
    }

    fetchPosts = () => {
        this.socket = new WebSocket("ws://"+window.location.host+"/post");
        this.socket.onmessage = ( e => {
            const posts = JSON.parse(e.data);
            this.setState( prev => {
                if(prev.posts === null){
                    return {posts: posts}
                } else{
                    return {posts: [...prev.posts, ...posts]}
                }
            })
        });
    };

    sendMessage = (mail) => {
        const payload = JSON.stringify({mail: mail, title: this.state.title,text: this.state.text});
        this.socket.send(payload);
        this.setState({
            title: "",
            text: ""
        });
    };

    updateEmail = (email) => {
        this.setState(email);
    };

    onTitleChange = (e) => {
        this.setState({title: e.target.value});
    };

    onTextChange = (e) => {
        this.setState({text: e.target.value});
    };

    renderLoggedIn() {
        return (
            <div>
                <div>
                    <p className="inputName">Title:</p>
                    <input type="text"
                           id="titleInputId"
                           className="inputName"
                           value={this.state.title}
                           onChange={this.onTitleChange}/>
                </div>
                <br/>
                <div>
                    <p>Text:</p>
                    <textarea  cols="50"
                               rows="4"
                               id="msgInputId"
                               value={this.state.text}
                               onChange={this.onTextChange} />
                </div>
                <br/>

                <div id="sendBtnId" className="btn" onClick={() => this.sendMessage(this.state.email)}>Send</div>
            </div>
        );
    };

    renderNotLoggedIn(){
        return(
            <div>
                Please login to see posts
            </div>
        )
    }

    postsDisplay() {
        let posts = <div><p>No posts to display</p></div>;
        if (this.state.messages !== null) {
            posts = <div>
                {this.state.messages.map(m =>
                    <p key={"msg_key" + m.id}> {m.mail +": ["+m.title+"] "+ m.text}</p>
                )}
            </div>;
        }
        return posts
    };

    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;
        if(loggedIn) this.updateEmail(user.email);

        return (
            <div>
                {loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn()}
                {this.postsDisplay()}
            </div>
        );
    }
}

export default withRouter(PostsList);
