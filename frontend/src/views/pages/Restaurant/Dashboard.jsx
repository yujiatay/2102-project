import React from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';

import Navbar from "components/Navbars/DarkNavBarRestaurant";
import BookingList from "../../../components/Restaurant/BookingList";
import ReactDatetime from "react-datetime";
import { requireAuthentication } from "components/AuthenticatedComponent";
import http from "http.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      modal: false,
      bookings: [],
      filterDate: null,
      filterConfirm: 0,

      alert: {
        visible: false,
        color: "primary",
        msg: ""
      },
    }
  }

  fetchBookings() {
    http.get(`/restaurants/${this.props.user.username}/bookings`)
      .then((res) => {
        this.setState({ bookings: res.data.data })
      });
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.fetchBookings();
  }

  setAlertVisible = (visible, color, msg) => {
    this.setState({
      alert: { visible, color, msg }
    });
  };

  onBookingConfirm(promise) {
    promise
      .then((res) => {
        this.setAlertVisible(true, "success", res.data.msg);
        this.fetchBookings();
      })
      .catch((err) => {
        if (err.response) {
          this.setAlertVisible(true, "danger", err.response.data.msg);
        }
      })
  }

  onValueChange(key) {
    return (e) => {
      const { target: { value } } = e;
      this.setState({
        [key]: value
      })
    }
  }

  onTimeChange(key) {
    return (date) => {
      this.setState({
        [key]: date.toDate()
      })
    }
  }

  applyBookingFilters() {
    const { bookings, filterDate, filterConfirm } = this.state;

    function isSameDate(firstDate, secondDate) {
      return firstDate.getDate() === secondDate.getDate()
        && firstDate.getMonth() === secondDate.getMonth()
        && firstDate.getFullYear() === secondDate.getFullYear()
    }

    function matchConfirmFilter(confirmStatus) {
      const filterConfirmVal = parseInt(filterConfirm);
      if (filterConfirmVal === 0) {
        return true;
      } else if (filterConfirmVal === 1) {
        return confirmStatus;
      } else {
        return !confirmStatus;
      }
    }

    return bookings.filter((booking) => {
      const date = new Date(booking.bookingDate);
      return isSameDate(date, filterDate ? filterDate : date) && matchConfirmFilter(booking.isConfirmed);
    })
  }

  render() {
    const { user } = this.props;
    const { filterDate, filterConfirm } = this.state;
    const bookings = this.applyBookingFilters();

    return (
      <>
        <Alert isOpen={this.state.alert.visible} color={this.state.alert.color}
               toggle={() => this.setState({ alert: { visible: false } })}
               style={{ zIndex: 1001, marginBottom: 0 }}
        >
          <span className="alert-inner--text">
            {this.state.alert.msg}
          </span>
        </Alert>
        <Navbar user={user} history={this.props.history}/>
        <main ref="main">
          <section className="section h-100vh">
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col>
                  <Form>
                    <FormGroup>
                      <Label for="date">Date</Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Choose a date"
                          }}
                          timeFormat={false}
                          value={filterDate}
                          onChange={this.onTimeChange("filterDate")}
                        />
                        {filterDate &&
                          <InputGroupAddon addonType="append">
                            <Button onClick={() => this.setState({filterDate: null})}>Cancel Filter</Button>
                          </InputGroupAddon>
                        }
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Input type="select" id="status"
                             value={filterConfirm} onChange={this.onValueChange("filterConfirm")}
                      >
                        <option value={0}>All</option>
                        <option value={1}>Confirmed</option>
                        <option value={2}>Unconfirmed</option>
                      </Input>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                  <BookingList bookings={bookings} restaurant={user} onCallback={this.onBookingConfirm.bind(this)}/>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    )
  }
}

function checkAuth(user, userType) {
  return !!(user && userType === 2);
}

export default requireAuthentication(Dashboard, checkAuth, "/");
