import React from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
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
  Button,
  Modal
} from "reactstrap";
import ReactDatetime from "react-datetime";
import { Link } from "react-router-dom";

import Navbar from "components/Navbars/DarkNavbar.jsx";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      modal: false
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

  toggleModal = () => {
    this.setState({ modal: !this.state.modal});
  }

  render() {
    return (
      <>
        <Navbar history={this.props.history}/>
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
                              defaultValue={new Date()}
                              onChange={e => this.setState({ date: e })}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="time">Time</Label>
                          <Input type="select" name="select" id="time">
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
                          <Input type="select" name="select" id="pax">
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
                          <Input type="select" name="select" id="location">
                            <option value="" disabled selected hidden>Please Choose...</option>
                            <option>North</option>
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="location">Budget</Label>
                          <Input type="select" name="select" id="budget">
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
                    [1,2,3,4,5].map((x) => (
                      <Card className="mt-4" style={{
                        border: '1px solid #cad1d7'
                      }}>
                        <CardBody>
                          <Row>
                            <Col xs={4}>
                              <img src="https://via.placeholder.com/150"/>
                            </Col>
                            <Col>
                              <CardTitle>
                                <Link to="/restaurants">
                                  Restaurant {x}
                                </Link>
                              </CardTitle>
                              <CardText>
                                <Row>
                                  Cuisine: ______
                                </Row>
                                <Row>
                                  Location: ______
                                </Row>
                                <Row>
                                  Price: $
                                </Row>
                              </CardText>
                              <Row>
                                <Col>
                                  <Input type="select" name="select" id="booktime">
                                    <option>1030</option>
                                    <option>1100</option>
                                    <option>1130</option>
                                    <option>1200</option>
                                    <option>1230</option>
                                  </Input>
                                </Col>
                                <Col>
                                  <Button onClick={this.toggleModal}>Book now</Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ))
                  }
                </Col>
              </Row>
            </Container>
          </section>
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.modal}
            onClick={this.toggleModal}
            >
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                Booking a reservation
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={this.toggleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              You are making a reservation for
              1 people at Bread Street Kitchen on Thu, 31 Oct 2019, 11:45 am            
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={this.toggleModal}
              >
                Cancel
              </Button>
              <Button color="primary" type="button">
                Book now
              </Button>
            </div>
          </Modal>
        </main>
      </>
    );
  }
}

export default Search;