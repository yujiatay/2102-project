/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
  NavbarBrand,
  Navbar,
  NavItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import http from "http.js";

class LightNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }

  logOut = () => {
    http.delete("/session")
      .then((res) => {
        // console.log(res)
        setTimeout(() => {
          this.props.history.push("/")
        }, 500);
      })
  };

  render() {
    const {user} = this.props;
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" href="/">
                BookLah!
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        BookLah!
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center ml-lg-auto">
                  {
                    user
                      ? (
                        <>
                          <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                            <UncontrolledDropdown nav>
                              <DropdownToggle nav>
                                <i className="ni ni-collection d-lg-none mr-1"/>
                                <span className="nav-link-inner--text">{user.username}</span>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem to="/invite" tag={Link}>
                                  Invite friends
                                </DropdownItem>
                                <DropdownItem onClick={this.logOut}>
                                  Logout
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </Nav>
                        </>
                      )
                      : (
                        <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                          <NavItem>
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              href="/login"
                            >
                              <span className="btn-inner--icon">
                                <i className="fa fa-sign-in mr-2"/>
                              </span>
                              <span className="nav-link-inner--text ml-1">
                                Sign In
                              </span>
                            </Button>
                          </NavItem>
                        </Nav>
                      )
                  }
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default LightNavbar;
