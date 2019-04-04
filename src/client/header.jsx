import React from "react";
import { withRouter } from "react-router-dom";
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink,
    Row, Col, NavItem
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  doLogout = async () => {
    const url = "/api/logout";

    let response;

    try {
      response = await fetch(url, { method: "post" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }

    if (response.status !== 204) {
      alert("Error when connecting to server: status code " + response.status);
      return;
    }

    this.props.updateLoggedInUserId(null);
    this.props.history.push("/");
  };

  renderLoggedIn(userId) {
    return (
        <Nav className="ml-auto" navbar>
          <NavItem>
          < NavLink href='/One'>One</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Two'>Two</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.doLogout}>Logout</NavLink>
          </NavItem>
        </Nav>
    );
  }



  renderNotLoggedIn() {
    return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href='/signup'>Sign up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/login'>Login</NavLink>
          </NavItem>
        </Nav>
    );
  }



  render() {
    const userId = this.props.userId;

    return (
            <Navbar
                color="dark"
                dark expand="md"
                style={{marginBottom: "10px"}}>
              <NavbarBrand href="/">LOGO/HOME</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                {userId !== null && userId !== undefined ? (
                        this.renderLoggedIn()
                ):(
                        this.renderNotLoggedIn()
                  )}
              </Collapse>
            </Navbar>
    );
  }
}

export default withRouter(Header);
