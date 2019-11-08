import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle,
  Col, Row, Button
} from 'reactstrap';

import { menuItemTypes } from "../../constants";
import http from "../../http";

class MenuItemCard extends React.Component {
  constructor(props) {
    super(props);
  }

  submitDelete(name) {
    return () =>
    this.props.onCallback(http.delete(`/restaurants/${this.props.restaurant.username}/menuitems/${name}`));
  }

  render() {
    const { name, description, type, price, image } = this.props.item;
    return (
      <div>
        <Card>
          <CardBody>
            <Row>
              <Col xs="4">
                <img src={image} alt="Item Image"/>
              </Col>
              <Col>
                <CardTitle>{name}</CardTitle>
                <CardSubtitle>{menuItemTypes[type]}</CardSubtitle>
                <CardText>Price: ${price}</CardText>
                <CardText>{description}</CardText>
                <Button color="primary">Edit</Button>
                <Button color="warning" onClick={this.submitDelete(name)}>Remove</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  };
}
export default MenuItemCard;