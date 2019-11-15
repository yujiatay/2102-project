import React from 'react';
import http from "http.js";

import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
  Label,
  Button,
  Modal,
} from "reactstrap";

class EditCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.ausername,
      createdAt: props.acreatedAt
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const body = {}
    formData.forEach((value, property) => body[property] = value.toString())
    console.table(body)
    // Request goes here.
    http.patch(`/diners/${this.props.ausername}/articles/${this.props.acreatedAt}/comments/${this.props.commentUsername}/${this.props.commentCreatedAt}`, null, { params: body })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        alert("Error editing article: " + error);
      });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onClose={this.props.toggleModal}
          >
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              Edit this Comment!
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
            <Form onSubmit={e => this.handleSubmit(e)}>
              <FormGroup>
                <Label for="exampleText">Add Markdown Content:</Label>
                <Input type="textarea" name="content" id="content" />
                <p></p>
                <Button>Submit</Button>
              </FormGroup>      
            </Form>    
          </div>
        </Modal>
      </div>
    );
  }
}

export default EditCommentModal;
