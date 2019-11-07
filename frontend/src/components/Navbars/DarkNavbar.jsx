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

// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import http from "http.js";

class DarkNavbar extends React.Component {
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
    const { user } = this.props;
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-dark bg-gradient-default"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" href="/">
                BookLah!
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon"/>
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
                        <span/>
                        <span/>
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      href="/search"
                    >
                      <i className="fa fa-search mr-1"/>
                      <span className="nav-link-inner--text">Search</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      href="/articles"
                    >
                      <i className="fa fa-book mr-1"/>
                      <span className="nav-link-inner--text">Articles</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                {
                  user
                    ? (
                      <>
                        <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                          <NavItem>
                            <NavLink
                              href="/myBookings"
                            >
                              <i className="ni ni-ui-04 d-lg-none mr-1"/>
                              <span className="nav-link-inner--text">My Bookings</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                          <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                              <i className="ni ni-collection d-lg-none mr-1"/>
                              <span className="nav-link-inner--text">{user.username}</span>
                            </DropdownToggle>
                            <DropdownMenu>
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
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DarkNavbar;
