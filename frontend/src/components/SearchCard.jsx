import React from 'react';
import { Link } from "react-router-dom";

import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import { cuisineTypes } from "constants.js";
import http from "http.js";

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeslots: []
    }
  }
  componentDidMount() {
    http.get(`/restaurants/${this.props.restaurant.username}/slots`)
      .then((res) => {
        this.setState({ timeslots: res.data.data })
      })
  }

  render() {
    const {name, cuisineType, branchLocation, username} = this.props.restaurant;
    
    return (
      <Card className="mt-4" style={{
        border: '1px solid #cad1d7'
      }}>
        <CardBody>
          <Row>
            <Col xs={4}>
              <img alt="restaurant" src="https://via.placeholder.com/150"/>
            </Col>
            <Col>
              <CardTitle>
                <Link to={`/restaurants/${username}`}>
                  {name}
                </Link>
              </CardTitle>
                <Row>
                  <CardText>Cuisine: {cuisineTypes[cuisineType]}</CardText>
                </Row>
                <Row>
                  <CardText>Location: {branchLocation}</CardText>
                </Row>
              {/* <Row>
                <Col>
                  <Input type="select" name="select" id="booktime">
                    {
                      this.state.timeslots.map((ts) => (
                        <option value={ts}>{ts.startTime} to {ts.endTime}</option>
                      ))
                    }
                  </Input>
                </Col>
                <Col>
                  <Button onClick={this.props.toggleModal}>Book now</Button>
                </Col>
              </Row> */}
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default SearchCard;