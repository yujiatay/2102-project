import React from 'react';
import { Button, Modal, Table } from 'reactstrap';
import { dayOfWeekList } from "../../constants";
import http from "../../http";

class AvailableSlotList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      startTime: "",
      endTime: "",
      dayOfWeek: ""
    }
  }

  removeSlot(startTime, endTime, dayOfWeek) {
    return () => {
      const dataString = `${dayOfWeek},${startTime},${endTime}`;
      this.toggleModal();
      this.props.onCallback(http.delete(`/restaurants/${this.props.restaurant.username}/slots/${dataString}`));
    };
  }

  toggleModal() {
    this.setState({
      deleteModal: !this.state.deleteModal
    })
  }

  setDeleteModal(startTime, endTime, dayOfWeek) {
    return () =>
      this.setState({
        deleteModal: true,
        startTime,
        endTime,
        dayOfWeek
      })
  };

  render() {
    const { slots } = this.props;
    const { deleteModal, startTime, endTime, dayOfWeek } = this.state;
    return (
      <>
        <Modal
          isOpen={deleteModal}
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
            You are deleting slot on {dayOfWeekList[parseInt(dayOfWeek)]}, {startTime} to {endTime}
          </div>
          <div className="modal-footer">
            <Button color="danger" type="button" onClick={this.removeSlot(startTime, endTime, dayOfWeek)}>
              Confirm
            </Button>
          </div>
        </Modal>
        <Table>
          <thead>
          <tr>
            <th style={{ width: '30%' }}>Day of Week</th>
            <th style={{ width: '30%' }}>Start Time</th>
            <th style={{ width: '30%' }}>End Time</th>
            <th style={{ width: '10%' }}>Remove?</th>
          </tr>
          </thead>
          <tbody>
          {slots.map((slot, key) => {
            const { startTime, endTime, dayOfWeek } = slot;
            return (
              <tr key={key}>
                <td>{dayOfWeekList[parseInt(dayOfWeek)]}</td>
                <td>{startTime}</td>
                <td>{endTime}</td>
                <td>
                  <Button color="warning" onClick={this.setDeleteModal(startTime, endTime, dayOfWeek)}>Delete</Button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </>
    );
  };
}

export default AvailableSlotList;