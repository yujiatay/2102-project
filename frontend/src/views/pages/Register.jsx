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
import classnames from "classnames";

// reactstrap components
import { Alert, Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";


// core components
import Navbar from "components/Navbars/Navbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import http from "http.js";
import RegisterDinerForm from "components/RegisterDiner";
import RegisterRestaurantForm from "components/RegisterRestaurant";
import { requireAuthentication } from "components/AuthenticatedComponent";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        email: '',
        password: '',
        name: '',
        branchLocation: '',
        openingHours: '',
        capacity: undefined,
        cuisineType: 1,
      },
      alert: {
        visible: false,
        color: "primary",
        msg: ""
      },
      tabs: 1,
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleChange = (value, event) => {
    this.setState({ 
      form: {
        ...this.state.form,
        [value]: event.target.value,
      }});
  }

  submitForm = (accountType) => {
    if (accountType === "diner") {
      this.registerDiner();
    } else if (accountType === "restaurant") {
      this.registerRestaurant();
    }
  }

  registerDiner = () => {
    const body = {
      email: this.state.form.email,
      password: this.state.form.password,
      username: this.state.form.username
    }
    http.post("/diners", body)
      .then((res) => {
        // console.log(res.data)
        this.setAlertVisible(true, "success", res.data.msg);
        const type = res.data.data.type;
        setTimeout(() => {
          if (type === 1) {
            this.props.history.push("/search");
          } else if (type === 2) {
            this.props.history.push("/dashboard");
          }
        }, 500);
      })
      .catch((err) => {
        if (err.response) {
          // console.log(err.response.data)
          this.setAlertVisible(true, "danger", err.response.data.msg)
        }
      })
  }

  registerRestaurant = () => {
    const body = {
      ...this.state.form
    }
    http.post("/restaurants", body)
      .then((res) => {
        this.setAlertVisible(true, "success", res.data.msg)
        setTimeout(() => {
          this.props.history.push("/dashboard")
        }, 1000);
      })
      .catch((err) => {
        if (err.response) {
          // console.log(err.response.data)
          this.setAlertVisible(true, "danger", err.response.data.msg)
        }
      })
  }

  setAlertVisible = (visible, color, msg) => {
    this.setState({ 
      alert: { visible, color, msg } 
    });
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  render() {
    return (
      <>
        <Alert isOpen={this.state.alert.visible} color={this.state.alert.color} 
          toggle={() => this.setState({ alert: { visible: false }})} 
          style={{ zIndex: 1001, marginBottom: 0 }}
        >  
          <span className="alert-inner--text">
            {this.state.alert.msg}
          </span>
        </Alert>
        <Navbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-md">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Sign up with credentials</small>
                      </div>
                      <Nav
                        className="nav-fill flex-column flex-md-row mb-4"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.tabs === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.tabs === 1
                            })}
                            onClick={e => this.toggleNavs(e, "tabs", 1)}
                            href="#diner"
                            role="tab"
                          >
                            <i className="ni ni-single-02 mr-2" />
                            Diner
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.tabs === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.tabs === 2
                            })}
                            onClick={e => this.toggleNavs(e, "tabs", 2)}
                            href="#restaurant"
                            role="tab"
                          >
                            <i className="ni ni-shop mr-2" />
                            Restaurant
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={"tabs" + this.state.tabs}>
                        <TabPane tabId="tabs1">
                          <RegisterDinerForm handleChange={this.handleChange} submitForm={this.submitForm}
                            form={this.state.form}/>
                        </TabPane>
                        <TabPane tabId="tabs2">
                          <RegisterRestaurantForm handleChange={this.handleChange} submitForm={this.submitForm}
                            form={this.state.form}/>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

function checkAuth(user) {
  return !(user);
}

function redirectLink(user, userType) {
  if (userType === 1) {
    return "/search";
  } else if (userType === 2) {
    return "/dashboard";
  } else {
    return "/"
  }
}

export default requireAuthentication(Register, checkAuth, "", redirectLink);
