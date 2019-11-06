import React from 'react';

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

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    }
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
              Leave a Review
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
              <Label for="exampleSelect">Select Rating:</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Add an optional comment here:</Label>
              <Input type="textarea" name="text" id="exampleText" />
              <p></p>
              <Button>Submit</Button>
            </FormGroup>          
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;
