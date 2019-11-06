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
  CustomInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Label,
  Button,
  Modal,
} from "reactstrap";
import ReactDatetime from "react-datetime";

import Navbar from "components/Navbars/DarkNavbar.jsx";

class Restaurant extends React.Component {
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
        <Navbar />
        <main ref="main">
          <section className="section h-100vh">
            <Container className="my-lg">
              <h2>All Restaurants</h2>
              <Card className="mt-4" style={{
                border: '1px solid #cad1d7'
              }}>
                <CardBody>
                  <Row>
                    {/* <Col xs={4}>
                      <img src="https://via.placeholder.com/150"/>
                    </Col> */}
                    <Col className="ml-4">
                      <CardTitle>Bread Street Kitchen</CardTitle>
                        <Row>
                          <CardText>Cuisine: ______</CardText>
                        </Row>
                        <Row>
                          <CardText>Location: ______</CardText>
                        </Row>
                        <Row>
                          <CardText>Opening hours: _____</CardText>
                        </Row>
                        <Row>
                          <CardText>Price: _____</CardText>
                        </Row>
                        <Row>
                          <CardText>Capacity: _____</CardText>
                        </Row>
                        <Row>
                          <CardText>Tags</CardText>
                        </Row>
                    </Col>
                  </Row>
                  <p></p>
                  <Button>Reviews</Button>
                  <Row className="mt-4">
                    <Col xs="auto">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <ReactDatetime
                            defaultValue={new Date()}
                            timeFormat={false}
                            isValidDate={this.valid}
                            onChange={e => this.setState({ date: e })}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs="auto" md="3">
                      <Input type="select" name="select" id="booktime">
                        <option>1030</option>
                        <option>1100</option>
                        <option>1130</option>
                        <option>1200</option>
                        <option>1230</option>
                      </Input>
                    </Col>
                    <Col xs="auto" md="3">
                      <CustomInput type="select" id="pax" name="customSelect">
                        <option>1 pax</option>
                        <option>2 pax</option>
                        <option>3 pax</option>
                        <option>4 pax</option>
                        <option>5 pax</option>
                      </CustomInput>
                    </Col>
                    <Col xs={2}>
                      <Button onClick={this.toggleModal}>
                        Book now
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Container>
          </section>
          <Modal
            // className="modal-dialog-centered"
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

export default Restaurant;