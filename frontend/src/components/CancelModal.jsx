import React from 'react';

import {
  Button,
  Modal,
} from "reactstrap";

class ReviewModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onClose={this.props.toggleModal}
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
              onClick={this.props.toggleModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            You are cancelling your reservation.
          </div>
          <div className="modal-footer">
            <Button color="danger" type="button" onClick={this.props.handleConfirm}>
              Confirm
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;
