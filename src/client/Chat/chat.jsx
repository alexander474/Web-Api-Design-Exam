import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from 'reactstrap';
import Message from './message'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            text: "",
            messages: null
        };
    }

    componentDidMount() {

        this.socket = new WebSocket("ws://" + window.location.host);

        this.socket.onmessage = (event =>{
            const msgList = JSON.parse(event.data);

            this.setState(
                prev => {
                    if(prev.messages === null){
                        return {messages: msgList};
                    } else {
                        return {messages: [...prev.messages, ...msgList]};
                    }
                }
            );
        })

    }



    onTextChange = (event) => {
        this.setState({text: event.target.value});
    };

    sendMsg = (e) => {
        e.preventDefault();
        const payload = JSON.stringify({userId: this.state.userId, text: this.state.text});

        this.socket.send(payload);

        //reset text after sending a message
        this.setState({text: ""});
    };

    async doLogInWebSocket(userId) {
        const url = "/api/wstoken";

        let response;

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }


        if (response.status === 401) {
            //this could happen if the session has expired
            this.setState({errorMsg: "You should log in first"});
            this.props.updateLoggedInUserId(null);
            return;
        }

        if (response.status !== 201) {
            this.setState({errorMsg: "Error when connecting to server: status code " + response.status});
            return;
        }

        const json = await response.json();

        const payload = json;
        payload.topic =  'login';

        this.socket.send(JSON.stringify(payload));
    };


    render() {

        let message = "";
        if(this.state.messages !== null && this.state.messages !== undefined){
            message = this.state.messages.map((m,i)=>{
                return (<Message key={i} userId={m.userId} text={m.text}/>)
            })
        }

        return (
            <Row>
                <Col>
                    <Row>
                        <h2>WebSocket-based Chat</h2>
                    </Row>
                <Row>
                    <Col>
                        <p>Your message:</p>
                        <textarea  cols="50"
                                   rows="5"
                                   value={this.state.text}
                                   onChange={this.onTextChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={(e)=>this.sendMsg(e)} color="primary">
                            Send
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {message}
                    </Col>
                </Row>
                </Col>
            </Row>
        );
    }
}

export default withRouter(Chat);




