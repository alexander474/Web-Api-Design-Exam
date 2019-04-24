import React from "react";
import { Link, withRouter } from "react-router-dom";

export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            chat: null,
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
            const chats = JSON.parse(e.data).filter( c => c.emailTo===this.state.currentReceiver);
            if(chats.length>0)this.onMessagesChange(chats);
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
        this.setState({currentReceiver});
    };

    onMessagesChange = (chats) => {
        console.log(chats);
        chats.chat.map(c =>{
                if(this.state.currentReceiver===c.emailOne||this.state.currentReceiver===c.emailTwo){
                    this.setState(prev => {
                        if (prev.messages === null) {
                            return {messages: c.chat}
                        } else {
                            return {messages: [...prev.messages, ...c.chat]}
                        }
                    });
                }
            }
        );
        console.log(this.state.chat);
        console.log(this.state.messages);

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
                               onChange={this.onTextChange} />
                </div>
                <br/>
                <div
                    id="sendId"
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
        if (this.state.chat !== null) {
            messages = <div>
                {this.state.chat.map(c =>{
                    if(currentReceiver===c.emailOne||currentReceiver===c.emailTwo){
                        this.onMessagesChange(c.chat);
                        return this.state.messages.map(m => {
                            this.onMessagesChange(m);
                            let name = m.emailFrom;
                            if(m.emailFrom===this.props.user.email){
                                name = this.props.user.email
                            }
                            return <p key={"msg_key" + m.id+m.text}> {name + ": " + m.text}</p>
                        })
                    }
                }
                )}
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
