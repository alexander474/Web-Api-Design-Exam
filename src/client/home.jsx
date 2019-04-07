import React from "react";
import { Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

import Menu from "./Menu/menu"

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  renderLoggedIn(userId){
      return (
          <div>
              <Row>
                  <Col>
                      WELCOME {userId}
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <Menu/>
                  </Col>
              </Row>
          </div>
      );
  }

  renderNotLoggedIn(){
        return (<Col>You need to login</Col>)
  }


  render() {
      const userId = this.props.userId;
      let display;
      if(userId === null || userId === undefined){
          display = this.renderNotLoggedIn();
      }else{
          display = this.renderLoggedIn(userId);
      }
    return (
        <Container>
          <Row>
              {display}
          </Row>
        </Container>
    );
  }
}
