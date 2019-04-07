import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from 'reactstrap';
import WeekMenu from "./weekMenu"

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            text: "",
            menus: null
        };
    }

    componentDidMount() {
        this.fetchMenus();
    }

    async fetchMenus() {
        const url = "/api/menu";

        let response;
        let payload;
        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of menus: " + err,
                menus: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                menus: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                menus: null
            });
        }
    }





    render() {
        console.log(this.state.menus);
        let display = "";
        if(this.state.menus !== null && this.state.menus !== undefined){
            display = this.state.menus.map((m, i)=>{
                return (<WeekMenu key={i} menu={m} />)
            })
        }

        return (
            <div>
                <Row>
                    <Col>
                        {display}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Chat);




