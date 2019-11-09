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

class NewArticleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const body = {}
    formData.forEach((value, property) => body[property] = value)
    console.log(body)
    // Request goes here.
    http.post(`http://localhost:8000/api/v1.0/articles`, body)
      .then(res => {
        // console.log(res);
        this.props.history.go(0);
      })
      .catch(error => {
        alert("Error posting new article: " + error);
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
              Add an Article!
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
                <Label for="exampleText">Add Title:</Label>
                <Input type="text" name="title" id="title" />
              </FormGroup>
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

export default NewArticleModal;
