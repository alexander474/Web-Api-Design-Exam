import React from "react";
import {Card, CardBody, CardText, CardTitle} from "reactstrap";

const Message = (props) => {
    const { userId, text } = props;

    return (
        <div style={{margin: "10px"}}>
            <Card>
                <CardBody>
                    <CardTitle>User: {userId}</CardTitle>
                    <CardText>Message: {text}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default Message;