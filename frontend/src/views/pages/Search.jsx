import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Label,
  Button
} from "reactstrap";
import ReactDatetime from "react-datetime";

import Navbar from "components/Navbars/DarkNavbar.jsx";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,

    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  valid = (current) => {
    const yesterday = ReactDatetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  render() {
    return (
      <>
        <Navbar />
        <main ref="main">
          <section className="section">
            <Container className="pt-md">
              <Row>
                <Col xs="4">
                  <Card shadow>
                    <CardHeader>
                      Search criteria
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <FormGroup>
                          <Label for="date">Date</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                              inputProps={{
                                placeholder: "Choose a date"
                              }}
                              timeFormat={false}
                              isValidDate={this.valid}
                              onChange={e => this.setState({ date: e })}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="time">Time</Label>
                          <Input type="select" name="select" id="exampleSelect">
                            {/* <option value="" disabled selected hidden>Please Choose...</option> */}
                            <option>1030</option>
                            <option>1100</option>
                            <option>1130</option>
                            <option>1200</option>
                            <option>1230</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="pax">Pax</Label>
                          <Input type="select" name="select" id="exampleSelect">
                            {/* <option value="" disabled selected hidden>Please Choose...</option> */}
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="cuisine">Cuisine</Label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option value="" disabled selected hidden>Please Choose...</option>
                            <option>Japanese</option>
                            <option>Lebanese</option>
                            <option>Chinese</option>
                            <option>Portuguese</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="location">Location</Label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option value="" disabled selected hidden>Please Choose...</option>
                            <option>North</option>
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="location">Budget</Label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option value="" disabled selected hidden>Please Choose...</option>
                            <option>$</option>
                            <option>$$</option>
                            <option>$$$</option>
                            <option>$$$$</option>
                          </Input>
                        </FormGroup>
                        <Button color="primary" type="button" block>
                          Search
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <FormGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-zoom-split-in" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Search" type="text" />
                    </InputGroup>
                  </FormGroup>
                  {
                    [1,2,3].map((x) => (
                      <Card body outline color="dark">
                        <CardBody>
                          Res {x}
                        </CardBody>
                      </Card>
                    ))
                  }
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Search;