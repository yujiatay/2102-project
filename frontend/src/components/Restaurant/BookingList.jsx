import React from 'react';
import {
  Table, Button, Modal
} from 'reactstrap';
import { dayOfWeekList } from "../../constants";
import http from "../../http";


class BookingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dusername: "",
      dayOfWeek: 0,
      startTime: "",
      endTime: "",
      date: 0
    }
  }

  onConfirm(dusername, dayOfWeek, startTime, endTime, date) {
    return () => {
      const body = {
        dusername,
        dayOfWeek,
        startTime,
        endTime,
        date
      };
      this.toggleModal();
      this.props.onCallback(http.post(`/restaurants/${this.props.restaurant.username}/bookings/confirm`, body));
    };
  }

  toggleModal() {
    this.setState({
      confirmModal: !this.state.confirmModal
    })
  }

  setConfirmModal(dusername, dayOfWeek, startTime, endTime, date) {
    return () =>
      this.setState({
        confirmModal: true,
        dusername,
        dayOfWeek,
        startTime,
        endTime,
        date
      })
  };


  render() {
    const { bookings } = this.props;
    const { confirmModal, dusername, dayOfWeek, date, startTime, endTime } = this.state;

    return (
      <>
        <Modal
          isOpen={confirmModal}
          onClose={this.toggleModal}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              Are you sure?
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
            You are confirming booking on {new Date(date).toISOString().slice(0, 10)} ({dayOfWeekList[parseInt(dayOfWeek)]}),
            {startTime.slice(0, 5)} to {endTime.slice(0, 5)} by {dusername}
          </div>
          <div className="modal-footer">
            <Button color="danger" type="button" onClick={this.onConfirm(dusername, dayOfWeek, startTime, endTime, date)}>
              Confirm
            </Button>
          </div>
        </Modal>
        <Table responsive>
          <thead>
          <tr>
            <th style={{ width: '25%' }}>Date</th>
            <th style={{ width: '10%' }}>Start Time</th>
            <th style={{ width: '10%' }}>End Time</th>
            <th style={{ width: '25%' }}>Diner</th>
            <th style={{ width: '10%' }}>Num Pax</th>
            <th style={{ width: '10%' }}>Message</th>
            <th style={{ width: '10%' }}>Confirmed</th>
          </tr>
          </thead>
          <tbody>
          {bookings.map(booking => {
            const { bookingDate, dayOfWeek, dusername, startTime, endTime, isConfirmed, message, pax } = booking;
            return (
              <tr key={`${dusername}${bookingDate}${startTime}${endTime}`}>
                <td>{new Date(bookingDate).toISOString().slice(0, 10)} ({dayOfWeekList[parseInt(dayOfWeek)]})</td>
                <td>{startTime.slice(0, 5)}</td>
                <td>{endTime.slice(0, 5)}</td>
                <td>{dusername}</td>
                <td>{pax}</td>
                <td>{message === "" ? "-" : message}</td>
                <td>{
                  isConfirmed
                    ? <Button disabled outline color="success">Confirmed</Button>
                    : <Button color="primary"
                              onClick={this.setConfirmModal(dusername, dayOfWeek, startTime, endTime, bookingDate)}
                    >
                      Confirm
                    </Button>
                }</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </>
    );
  };
}

export default BookingList;