import React from 'react';
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
  FormGroup,
  Form,
  Input,
  CustomInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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
    //here you can update, remove, add values/properties in the body object this is specially usefull if any custom process must be done to check, encrypt data or wherever you want.
    console.table(body)
    // Request goes here.
    axios.post(`http://localhost:8000/api/v1.0/articles`, null, { params: body })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

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
