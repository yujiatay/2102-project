import React from 'react';
import { Link } from "react-router-dom";

import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import { cuisineTypes } from "constants.js";
import http from "http.js";
import BookmarkButton from './BookmarkButton';

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
    const {displayBookmark} = this.props;
    return (
      <Card className="mt-4" style={{
        border: '1px solid #cad1d7'
      }}>
        <CardBody>
          <CardTitle>
            <Link to={`/restaurants/${username}`}>
              {name}
            </Link>
          </CardTitle>
          <Row className="px-2">
            {/* <Col xs={4}>
              <img alt="restaurant" src="https://via.placeholder.com/150"/>
            </Col> */}
            <Col>
              <Row>
                <CardText>Cuisine: {cuisineTypes[cuisineType]}</CardText>
              </Row>
              <Row>
                <CardText>Location: {branchLocation}</CardText>
              </Row>
            </Col>
            <Col xs="auto">
              {
                displayBookmark && 
                <BookmarkButton
                  bookmarked={this.props.bookmarked}
                  bookmark={this.props.bookmark}
                  rusername={username}
                />
              }
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default SearchCard;