import React from "react";
import { Link, withRouter } from "react-router-dom";

export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            messages: null,
            currentReciever: null,
        }
    }

    componentDidMount() {
        if(this.state.currentReciever !== null) {
            this.fetchChat();
        }
    }

    componentWillUnmount() {
        if(this.state.currentReciever !== null) {
            this.socket.close();
        }
    }

    fetchChat = () => {
        let open = false;
        if(!open) {
            open = true;
            this.socket = new WebSocket("ws://" + window.location.host + "/message/" + this.state.currentReciever);
            this.socket.onmessage = (e => {
                const messages = JSON.parse(e.data);
                this.setState(prev => {
                    if (prev.messages === null) {
                        return {messages: messages}
                    } else {
                        return {messages: [...prev.messages, ...messages]}
                    }
                })
            });
        }else{
            this.socket.close();
            open = false;
        }
    };

    sendMessage = (emailFrom, emailTo) => {
        const payload = JSON.stringify({
            emailFrom: emailFrom,
            emailTo: emailTo,
            text: this.state.text});
        this.socket.send(payload);
        this.setState({text: ""});
    };

    onCurrentRecieverChange = (currentReciever) => {
        this.setState({currentReciever});
        this.fetchChat();
    };

    onTextChange = (e) => {
        this.setState({text: e.target.value});
    };


    loggedInFields() {
        return(
            <div>
                <div>
                    <p>TO: {this.state.currentReciever!==null?this.state.currentReciever:"SELECT RECIEVER"}</p>
                    <p>Message:</p>
                    <textarea  cols="50"
                               rows="4"
                               value={this.state.text}
                               onChange={this.onTextChange} />
                </div>
                <br/>
                <div
                    id="sendId"
                    className="btn"
                    onClick={() => this.sendMessage(this.props.user.email, this.state.email)}>
                    Send
                </div>
            </div>
        );
    };

    friendsDisplay(){
        return (
            <div>
                <h2>Friends: </h2>
                <ul>
                    {this.props.user.friends.map(f => {
                        return (
                            <li
                            className={"chat_friends_email"}
                            key={"ii_key_"+f}
                            onClick={()=>this.onCurrentRecieverChange(f)}>
                            {f}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }

    messageDisplay() {
        let messages = <div/>;
        if (this.state.messages !== null) {
            messages = <div>
                {this.state.messages.map(m =>
                    <p key={"msg_key" + m.id}> {m.author + ": " + m.text}</p>
                )}
                </div>;
        }
        return messages
    };

    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        if(loggedIn) {
            return (
                <div>
                    <div className={"chat_main"}>
                        {this.loggedInFields()}
                        {this.messageDisplay()}
                    </div>
                    <div className={"chat_friend_display"}>
                        {this.friendsDisplay()}
                    </div>
                </div>
            );
        }else{
            return <div>Needs to login</div>
        }
    }
}

export default withRouter(Chat);
