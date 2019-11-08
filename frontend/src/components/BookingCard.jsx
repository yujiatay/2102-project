import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import http from "http.js";
import ReviewModal from 'components/ReviewModal.jsx'
import CancelModal from 'components/CancelModal.jsx';

class BookingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: undefined,
      review: undefined,
      cancelModal: false,
      reviewModal: false,
    }
  }

  componentDidMount() {
    http.get(`/restaurants/${this.props.booking.rusername}`)
      .then((res) => {
        this.setState({ restaurant: res.data.data.restaurant })
      })
    http.get(`/restaurants/${this.props.booking.rusername}/reviews/${this.props.username}`)
      .then((res) => {
        console.log(res.data.data)
        this.setState({ review: res.data.data })
      })
      .catch((err) => {})
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
    setTimeout(this.refresh, 200);
  }

  handleSubmit = (body, isEdit) => {
    this.props.onReview(this.props.booking.rusername, body, isEdit);
    setTimeout(this.refresh, 200);
  }

  toggleModal = (isCancel) => {
    if (isCancel) {
      this.setState({ cancelModal: !this.state.cancelModal});
    } else {
      this.setState({ reviewModal: !this.state.reviewModal});
    }
  }

  renderReviewButton = () => {
    if (this.props.booking.isConfirmed) {
      if (this.state.review !== undefined) {
        return (<Button onClick={() => this.toggleModal(false)}>Edit your review</Button>)
      } else {
        return (<Button onClick={() => this.toggleModal(false)}>Leave a review</Button>)
      }
    }
  }

  refresh = () => {
    this.props.history.go(0);
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
              <Button onClick={() => this.toggleModal(true)}>Cancel</Button>
              {this.renderReviewButton()}
            </CardBody>
          </Card>
        </div>
        <CancelModal 
          isOpen={this.state.cancelModal}
          toggleModal={() => this.toggleModal(true)}
          handleConfirm={this.handleCancel}
        />
        <ReviewModal
          isOpen={this.state.reviewModal}
          toggleModal={() => this.toggleModal(false)}
          handleSubmit={this.handleSubmit}
          review={this.state.review}
          refresh={this.refresh}
        />
      </>
    );
  }
}

export default BookingCard;