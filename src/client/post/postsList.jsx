import React from "react";
import { Link, withRouter } from "react-router-dom";

export class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            title: "",
            text: "",
            posts: null,
        }
    }

    componentWillMount() {
        if(this.props.user !== null && this.props.user !== undefined){
            this.updateEmail(this.props.user.email)
        }
    }

    componentDidMount() {
        if(this.props.user !== null && this.props.user !== undefined) {
            this.fetchPosts();
        }
    }

    componentWillUnmount() {
        if(this.socket) {
            this.socket.close();
        }
    }

    fetchPosts = () => {
        this.socket = new WebSocket("ws://"+window.location.host+this.props.endPoint);
        this.socket.onmessage = ( e => {
            const posts = JSON.parse(e.data);
            this.setState( prev => {
                if(prev.posts === null){
                    return {posts: posts}
                } else{
                    return {posts: [...posts, ...prev.posts].sort((a,b) => a.date - b.date)}
                }
            })
        });
    };

    sendMessage = (email) => {
        if(this.state.title.length>0&&this.state.text.length>0) {
            const payload = JSON.stringify({email: email, title: this.state.title, text: this.state.text});
            this.socket.send(payload);
            this.setState({
                title: "",
                text: ""
            });
        }
    };

    updateEmail = (email) => {
        this.setState({email});
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
                <div className={"post_input post_title_div"}>
                    <p className="inputName">Title:</p>
                    <input type="text"
                           id="titleInputId"
                           className="inputName"
                           value={this.state.title}
                           onChange={this.onTitleChange}/>
                </div>
                <div className={"post_input post_text_div"}>
                    <p>Text:</p>
                    <textarea  cols="50"
                               rows="4"
                               id="msgInputId"
                               value={this.state.text}
                               onChange={this.onTextChange} />
                </div>
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
        if (this.state.posts !== null) {
            posts = <div>
                {this.state.posts.map((m,i) => {
                    return (
                        <div className={"post_element"} key={"msg_key_ls" +(i*2)}>
                            <p className={"post_title"}>{m.title}</p>
                            <p className={"post_email"}>{m.email}</p>
                            <p className={"post_text"}>{m.text}</p>
                        </div>
                        )}
                )}
            </div>;
        }
        return posts
    };

    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                {loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn()}
                {loggedIn ? this.postsDisplay() : null}
            </div>
        );
    }
}

export default PostsList;
