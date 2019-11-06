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

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";

// core components
import Navbar from "components/Navbars/Navbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import http from "http.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      alert: {
        visible: false,
        color: "primary",
        msg: ""
      }
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleChange = (value, event) => {
    this.setState({[value]: event.target.value});
  }

  submitForm = () => {
    const body = {
      username: this.state.username,
      password: this.state.password,
    }
    http.post("/session", body)
    .then((res) => {
      // console.log(res)
      this.setAlertVisible(true, "success", res.data.msg)
      setTimeout(() => {
        this.props.history.push("/search")
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
                        <small>Sign in with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Username" type="username" value={this.state.username}
                              onChange={(e) => this.handleChange('username', e)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              value={this.state.password}
                              onChange={(e) => this.handleChange('password', e)}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={this.submitForm}
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      {/* <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a> */}
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="/register"
                      >
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
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

export default Login;
