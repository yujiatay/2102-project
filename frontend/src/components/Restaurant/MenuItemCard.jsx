import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle,
  Col, Row, Button
} from 'reactstrap';

const MenuItemCard = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <Row>
            <Col xs="4">
              <img src="https://via.placeholder.com/150" alt="Item Image"/>
            </Col>
            <Col>
              <CardTitle>Chicken and Waffles</CardTitle>
              <CardSubtitle>Main</CardSubtitle>
              <CardText>Price: $20</CardText>
              <CardText>If you know, you know.</CardText>
              <Button color="primary">Edit</Button>
              <Button color="warning">Remove</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default MenuItemCard;