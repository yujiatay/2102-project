import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import http from "http.js";

class BookingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: undefined
    }
  }

  componentDidMount() {
    http.get(`/restaurants/${this.props.booking.rusername}`)
      .then((res) => {
        this.setState({ restaurant: res.data.data.restaurant })
      })
  }

  handleCancel = () => {
    const data = {
      dusername: this.props.booking.dusername,
      dayOfWeek: this.props.booking.dayOfWeek,
      startTime: this.props.booking.startTime,
      endTime: this.props.booking.endTime,
      date: this.props.booking.bookingDate,
    }
    this.props.onCancel(this.props.booking.rusername, data);
  }

  render() {
    const {rusername, bookingDate, pax, message, startTime, endTime} = this.props.booking;
    return (
      <>
        <div>
          <Card>
            <CardBody>
              <CardTitle>
                Restaurant: {this.state.restaurant ? this.state.restaurant.name : rusername}
              </CardTitle>
              <CardSubtitle>
                <p>Date: {new Date(bookingDate).toDateString()}</p>
                <p>Time: {startTime} to {endTime}</p>
                <p>Number of diners: {pax}</p>
                <p>Additional requests: {message}</p>
              </CardSubtitle>
              <hr/>
              <CardText>Press the button below to withdraw or cancel your booking.</CardText>
              <Button onClick={this.handleCancel}>Cancel</Button>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

export default BookingCard;