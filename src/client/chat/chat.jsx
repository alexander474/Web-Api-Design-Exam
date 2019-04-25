import React from "react";
import { Link, withRouter } from "react-router-dom";

export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            currentReceiver: null,
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
        if(this.socket) this.socket.close();
        this.socket = new WebSocket("ws://" + window.location.host + "/message");
        this.socket.onmessage = (e => {
            const messages = JSON.parse(e.data).filter( m => (m.emailTo===this.state.currentReceiver&&m.emailFrom===this.props.user.email)||
                (m.emailFrom===this.state.currentReceiver&&m.emailTo===this.props.user.email));
            this.setState( prev => {
                if(prev.messages === null){
                    return {messages: messages}
                } else{
                    return {messages: [...prev.messages, ...messages]}
                }
            });
            console.log(this.state.messages);
        });
    };

    sendMessage = (emailFrom, emailTo) => {
        if(this.state.text.length>0&&emailFrom!==null&&emailTo!==null) {
            const payload = JSON.stringify({
                emailFrom: emailFrom,
                emailTo: emailTo,
                text: this.state.text
            });
            this.socket.send(payload);
            this.setState({text: ""});
        }
    };

    onCurrentReceiverChange = (currentReceiver) => {
        this.onMessagesChange([]);
        this.fetchChat();
        this.setState({currentReceiver});
    };

    onMessagesChange = (messages) => {
        this.setState({messages});
    };

    onTextChange = (e) => {
        this.setState({text: e.target.value});
    };


    loggedInFields() {
        return(
            <div>
                <div>
                    <p>TO: {this.state.currentReceiver!==null?this.state.currentReceiver:"SELECT RECIEVER"}</p>
                    <p>Message:</p>
                    <textarea  cols="50"
                               rows="4"
                               value={this.state.text}
                               id="msgInputId"
                               onChange={this.onTextChange} />
                </div>
                <br/>
                <div
                    id="sendBtnId"
                    className="btn"
                    onClick={() => this.sendMessage(this.props.user.email, this.state.currentReceiver)}>
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
                            id="friendsChatSelectBtnId"
                            onClick={()=>this.onCurrentReceiverChange(f)}>
                            {f}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }

    messageDisplay() {
        const currentReceiver = this.state.currentReceiver;
        let messages = <div/>;
        if (this.state.messages !== null) {
            messages = <div>
                {this.state.messages.map(m => {
                    let name = m.emailFrom;
                    if(m.emailFrom===this.props.user.email){
                        name = this.props.user.email
                    }
                    return <p key={"msg_key" + m.id+m.text}> {name + ": " + m.text}</p>
                })
                }
                </div>;
        }
        return messages
    };


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;
        const friendsExists = user!==null&&user.friends !== null&&user.friends!==undefined&&user.friends.length>0;

        if(loggedIn&&friendsExists) {
            return (
                <div>
                    <div className={"chat_main"}>
                        {this.loggedInFields()}
                        {this.state.currentReceiver!==null?this.messageDisplay():null}
                    </div>
                    <div className={"chat_friend_display"}>
                        {this.friendsDisplay()}
                    </div>
                </div>
            );
        }else if(loggedIn&&!friendsExists){
            return <div>No friends</div>
        }else{
            return <div>Needs to login</div>
        }
    }
}

export default withRouter(Chat);
