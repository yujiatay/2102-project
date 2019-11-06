import React from 'react';
import { Link } from "react-router-dom";

import { Button, Card, CardBody, CardText, CardTitle, Col, Input, Row } from "reactstrap";
import { cuisineTypes } from "constants.js";

const SearchCard = (props) => {
  const {name, cuisineType, branchLocation} = props.restaurant;
  return (
    <Card className="mt-4" style={{
      border: '1px solid #cad1d7'
    }}>
      <CardBody>
        <Row>
          <Col xs={4}>
            <img src="https://via.placeholder.com/150"/>
          </Col>
          <Col>
            <CardTitle>
              <Link to="/restaurants">
                {name}
              </Link>
            </CardTitle>
            <CardText>
              <Row>
                Cuisine: {cuisineTypes[cuisineType]}
              </Row>
              <Row>
                Location: {branchLocation}
              </Row>
            </CardText>
            <Row>
              <Col>
                <Input type="select" name="select" id="booktime">
                  <option>1030</option>
                  <option>1100</option>
                  <option>1130</option>
                  <option>1200</option>
                  <option>1230</option>
                </Input>
              </Col>
              <Col>
                <Button onClick={props.toggleModal}>Book now</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default SearchCard;