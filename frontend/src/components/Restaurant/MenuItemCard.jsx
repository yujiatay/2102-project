import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle,
  Col, Row, Button, Modal
} from 'reactstrap';

import { menuItemTypes } from "../../constants";
import http from "../../http";

class MenuItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false
    }
  }

  submitDelete(name) {
    return () => {
      this.toggleModal();
      this.props.onCallback(http.delete(`/restaurants/${this.props.restaurant.username}/menuitems/${name}`));
    }
  }

  toggleModal() {
    this.setState({
      deleteModal: !this.state.deleteModal
    })
  }

  render() {
    const { name, description, type, price, image } = this.props.item;
    const { deleteModal } = this.state;
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
            You are deleting {name}
          </div>
          <div className="modal-footer">
            <Button color="danger" type="button" onClick={this.submitDelete(name)}>
              Confirm
            </Button>
          </div>
        </Modal>
        <Card>
          <CardBody>
            <Row>
              <Col xs="auto">
                <img src={image} alt="Item" width={150}/>
              </Col>
              <Col>
                <CardTitle>{name}</CardTitle>
                <CardSubtitle>{menuItemTypes[type]}</CardSubtitle>
                <CardText>Price: ${price}</CardText>
                <CardText>{description}</CardText>
                <Button color="warning" onClick={this.toggleModal.bind(this)}>Remove</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    );
  };
}
export default MenuItemCard;