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
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import http from "http.js";

class DarkNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    http.get("/session")
    .then((res) => {
      // console.log(res)
      this.setState({ user: res.data.data.entity })
    })
  }

  logOut = () => {
    http.delete("/session")
    .then((res) => {
      // console.log(res)
      setTimeout(() => {
        this.props.history.push("/")
      }, 1000);
    })
  }

  render() {
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
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      href="/search"
                    >
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Search</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      href="/restaurants"
                    >
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">All Restaurants</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      href="/myBookings"
                    >
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">My Bookings</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      href="/articles"
                    >
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Articles</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#"
                      id="tooltip356693867"
                      target="_blank"
                    >
                      <i className="ni ni-notification-70" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Notifications
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip356693867">
                      Notifications
                    </UncontrolledTooltip>
                  </NavItem>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  {
                    this.state.user
                    ? (
                      <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                          <i className="ni ni-collection d-lg-none mr-1" />
                          <span className="nav-link-inner--text">{this.state.user.username}</span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem to="/profile" tag={Link}>
                            Bookings
                          </DropdownItem>
                          <DropdownItem onClick={this.logOut}>
                            Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ) : (
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="/login"
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-sign-in mr-2" />
                        </span>
                        <span className="nav-link-inner--text ml-1">
                          Sign In
                        </span>
                      </Button>
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
export default DarkNavbar;
