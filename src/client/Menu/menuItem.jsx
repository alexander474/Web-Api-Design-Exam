import React from "react";
import {Card, CardBody, CardText, CardTitle, CardSubtitle} from "reactstrap";

const MenuItem = (props) => {
    const { day, name, price } = props;

    return (
        <div style={{margin: "10px"}}>
            <Card>
                <CardBody>
                    <CardTitle>{day}</CardTitle>
                    <CardSubtitle>{name}</CardSubtitle>
                    <CardText>{name} for {price},-</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default MenuItem;