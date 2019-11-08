import React from 'react';

import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  FormGroup,
  Input,
  CustomInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Button,
  Modal,
  Alert
} from "reactstrap";
import ReactDatetime from "react-datetime";

import Navbar from "components/Navbars/DarkNavbar.jsx";
import http from "http.js";
import { requireAuthentication } from "../../components/AuthenticatedComponent";
import { cuisineTypes } from "constants.js";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ReactDatetime.moment().startOf('day'),
      modal: false,
      restaurant: undefined,
      tags: [],
      timeslots: [],
      reviews: [],
      pax: 1,
      selectedSlot: 0,
      message: '',
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

    let username = this.props.match.params.username;
    http.get(`/restaurants/${username}`)
      .then((res) => {
        this.setState({ 
          restaurant: res.data.data.restaurant,
          tags: res.data.data.tags
        });
        http.get(`/restaurants/${username}/slots`)
          .then((res) => {
            this.setState({ timeslots: res.data.data });
          })
        http.get(`/restaurants/${username}/reviews`)
          .then((res) => {
            this.setState({ reviews: res.data.data });            
          })
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  handleChange = (value, event) => {
    this.setState({[value]: event.target.value});
  }

  setAlertVisible = (visible, color, msg) => {
    this.setState({ 
      alert: { visible, color, msg } 
    });
  }

  valid = (current) => {
    const yesterday = ReactDatetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal});
  }

  getTags = (tags) => {
    return tags.map(t => t.tag).join(", ")
  }

  getTimeSlots = () => {
    return this.state.timeslots.filter(ts => ts.dayOfWeek === this.state.date.day());
  }

  handleBooking = () => {
    const slot = this.getTimeSlots()[this.state.selectedSlot];
    const body = {
      dayOfWeek: this.state.date.day(),
      startTime: slot.startTime,
      endTime: slot.endTime,
      date: this.state.date.startOf('day'),
      pax: parseInt(this.state.pax),
      message: this.state.message
    }
    
    http.post(`/restaurants/${this.state.restaurant.username}/bookings`, body)
      .then((res) => {
        this.setAlertVisible(true, "success", `Your reservation is pending confirmation from ${this.state.restaurant.name}. :)`);
        setTimeout(() => {
          this.props.history.push("/myBookings")
        }, 1000);
      })
      .catch((err) => {
        this.setAlertVisible(true, "danger", err.response.data.msg)
      })
  }

  renderRestaurant = () => {
    if (!this.state.restaurant) {
      return (
        <div>404 Restaurant Not Found</div>
      );
    }

    const {name, cuisineType, branchLocation, openingHours, capacity} = this.state.restaurant;
    return (
      <Card className="mt-4" style={{
        border: '1px solid #cad1d7'
      }}>       
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <Row>
            {/* <Col xs={4}>
              <img src="https://via.placeholder.com/150"/>
            </Col> */}
            <Col className="ml-4">
                <Row>
                  <CardText>Cuisine: {cuisineTypes[cuisineType]}</CardText>
                </Row>
                <Row>
                  <CardText>Location: {branchLocation}</CardText>
                </Row>
                <Row>
                  <CardText>Opening hours: {openingHours}</CardText>
                </Row>
                <Row>
                  <CardText>Capacity: {capacity}</CardText>
                </Row>
                <Row>
                  <CardText>Tags: {this.getTags(this.state.tags)}</CardText>
                </Row>
            </Col>
          </Row>
          <p></p>
          {
            this.state.timeslots.length > 0
            && (
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
                        value={this.state.date}
                        timeFormat={false}
                        isValidDate={this.valid}
                        onChange={e => this.setState({ date: e })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                {
                  this.getTimeSlots().length > 0
                  ? <>
                      <Col xs="auto" md="3">
                        <Input type="select" name="select" id="booktime"
                          value={this.state.selectedSlot} onChange={(e) => this.handleChange('selectedSlot', e)}>
                          {
                            this.getTimeSlots().map((ts, index) => (
                              <option key={index} value={index}>{ts.startTime} to {ts.endTime}</option>
                            ))
                          }
                        </Input>
                      </Col>
                      <Col xs="auto" md="3">
                        <CustomInput type="select" id="pax" name="customSelect"
                          value={this.state.pax} onChange={(e) => this.handleChange('pax', e)}>
                          <option value={1}>1 pax</option>
                          <option value={2}>2 pax</option>
                          <option value={3}>3 pax</option>
                          <option value={4}>4 pax</option>
                          <option value={5}>5 pax</option>
                        </CustomInput>
                      </Col>
                      <Col xs={2}>
                        <Button onClick={this.toggleModal}>
                          Book now
                        </Button>
                      </Col>
                    </>
                  : <Col xs="auto" md="5" className="align-items-center mb-3" style={{display: 'flex'}}>
                      <CardText>Sorry! No available slots left. Please try another date.</CardText>
                    </Col>
                }
                
              </Row>
            )
          }
          <hr/>
          <Row>
            <Col>
              <CardTitle>Reviews</CardTitle>
              {
                this.state.reviews.length === 0 &&
                <div>
                  <p>No reviews yet.</p>
                </div>
              }
              {
                this.state.reviews.map((r) => (
                  <div key={r.dusername}>
                    <p>* "{r.comment}" ({r.rating}/5 stars)</p>
                    <p className="ml-4"><i>by <b>@{r.dusername}</b> on {new Date(r.updatedAt).toDateString()}</i></p>
                  </div>
                ))
              }
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }

  renderModal = () => {
    if (!this.state.restaurant || this.state.timeslots.length === 0 || !this.state.modal) {
      return null;
    }
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.modal}
        toggle={this.toggleModal}
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
          <p>You are making a reservation for {this.state.pax} people {" "}
          at {this.state.restaurant.name} on {this.state.date.format('MMM Do YYYY')}, {" "}
          {this.getTimeSlots()[this.state.selectedSlot].startTime}.</p>
          <InputGroup>
            <Input
              placeholder="Include any food allergies or special arrangements.." 
              type="textarea" 
              rows
              value={this.state.message}
              onChange={(e) => this.handleChange('message', e)}/>
          </InputGroup>
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
          <Button color="primary" type="button" onClick={this.handleBooking}>
            Book now
          </Button>
        </div>
      </Modal>
    )
  }

  render() {
    const { user } = this.props;
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
        <Navbar user={user} history={this.props.history} />
        <main ref="main">
          <section className="section">
            <Container className="my-lg">
              {this.renderRestaurant()}
            </Container>
          </section>
          {this.renderModal()}
        </main>
      </>
    );
  }
}

function checkAuth() {
  return true;
}

export default requireAuthentication(Restaurant, checkAuth);