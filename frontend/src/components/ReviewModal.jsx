 import React from 'react';

import {
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
} from "reactstrap";
import http from "http.js";

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      comment: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.review !== undefined && prevProps.review === undefined) {
      this.setState({
        rating: this.props.review.rating,
        comment: this.props.review.comment
      })
    }
  }

  handleChange = (value, event) => {
    this.setState({[value]: event.target.value});
  }

  submitForm = () => {
    const body = {
      rating: parseInt(this.state.rating),
      comment: this.state.comment
    }
    if (this.props.review !== undefined) {
      // boolean flag is for indicating that this is an edit on a review
      this.props.handleSubmit(body, true)
      this.props.toggleModal()
    } else {
      this.props.handleSubmit(body, false)
      this.props.toggleModal()
    }
  }

  deleteReview = () => {
    const {rusername, dusername} = this.props.review;
    http.delete(`/restaurants/${rusername}/reviews/${dusername}`)
      .then((res) => {
        this.props.toggleModal()
        setTimeout(this.props.refresh, 200);
      })
  }

  render() {
    const review = this.props.review;
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggleModal}
          >
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              {review !== undefined ? "Edit your review" : "Leave a review"}
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
            <FormGroup>
              <Label for="rating">Select Rating:</Label>
              <Input type="select" name="select" id="rating"
                value={this.state.rating} onChange={(e) => this.handleChange('rating', e)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="comment">Add an optional comment here:</Label>
              <Input type="textarea" name="text" id="comment"
                value={this.state.comment} onChange={(e) => this.handleChange('comment', e)}/>
              <p></p>
              
            </FormGroup>
          </div>
          <div className="modal-footer">
              <Button onClick={this.submitForm}>
                {review !== undefined ? "Save" : "Submit"}
              </Button>
              {
                review !== undefined &&
                <Button color="danger" onClick={this.deleteReview}>
                  Delete review
                </Button>
              }
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;
