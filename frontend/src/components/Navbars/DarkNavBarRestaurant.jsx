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
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import http from "http.js";

class DemoNavbar extends React.Component {
  logOut = () => {
    http.delete("/session")
      .then((res) => {
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
            className="navbar-transparent navbar-dark bg-gradient-default"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" href="/dashboard">
                BookLah! (Restaurant)
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/dashboard">
                        BookLah! (Restaurant)
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
                    <NavLink href="/dashboard">
                      <i className="ni ni-book-bookmark" />
                      <span className="nav-link-inner--text">
                        Bookings
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink href="/restaurant-details">
                      <i className="ni ni-shop" />
                      <span className="nav-link-inner--text">
                        Restaurant Profile
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink href="/analytics">
                      <i className="ni ni-spaceship" />
                      <span className="nav-link-inner--text">
                        Analytics
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">{user.username}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.logOut}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
