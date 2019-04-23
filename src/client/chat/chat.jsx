import React from "react";
import { Link, withRouter } from "react-router-dom";

export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Unknown",
            text: "",
            messages: null,
        }
    }

    componentDidMount() {
        this.fetchChat();
    }

    componentWillUnmount() {
        this.socket.close();
    }

    fetchChat = () => {
        this.socket = new WebSocket("ws://"+window.location.host);
        this.socket.onmessage = ( e => {
           const messages = JSON.parse(e.data);
           this.setState( prev => {
               if(prev.messages === null){
                   return {messages: messages}
               } else{
                   return {messages: [...prev.messages, ...messages]}
               }
           })
        });
    };

    sendMessage = (name) => {
        const payload = JSON.stringify({author: name, text: this.state.text});
        this.socket.send(payload);
        this.setState({text: ""});
    };

    onNameChange = (e) => {
        this.setState({name: e.target.value});
    };

    onTextChange = (e) => {
        this.setState({text: e.target.value});
    };

    notLoggedInFields() {
        return (
            <div>
                <div>
                    <p className="inputName">Name:</p>
                    <input type="text"
                           id="nameInputId"
                           className="inputName"
                           value={this.state.name}
                           onChange={this.onNameChange}/>
                </div>
                <br/>
                <div>
                    <p>Message:</p>
                    <textarea  cols="50"
                               rows="4"
                               id="msgInputId"
                               value={this.state.text}
                               onChange={this.onTextChange} />
                </div>
                <br/>

                <div id="sendBtnId" className="btn" onClick={() => this.sendMessage(this.state.name)}>Send</div>
            </div>
        );
    };

    loggedInFields(userId) {
        return(
            <div>
                <div>
                    <p className="inputName">Name:</p>
                    <p>{userId}</p>
                </div>
                <br/>
                <div>
                    <p>Message:</p>
                    <textarea  cols="50"
                               rows="4"
                               value={this.state.text}
                               onChange={this.onTextChange} />
                </div>
                <br/>

                <div id="sendId" className="btn" onClick={() => this.sendMessage(userId)}>Send</div>
            </div>
        );
    };

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

        return (
            <div>
                {loggedIn ? this.loggedInFields(user.userId) : this.notLoggedInFields()}
                {this.messageDisplay()}
            </div>
        );
    }
}

export default withRouter(Chat);
