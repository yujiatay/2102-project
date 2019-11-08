import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
  Label,
  Button,
} from "reactstrap";
import ReactDatetime from "react-datetime";

import Navbar from "components/Navbars/DarkNavbar.jsx";
import { cuisineTypesList } from "constants.js";
import http from "http.js";
import SearchCard from 'components/SearchCard';
import { requireAuthentication } from "../../components/AuthenticatedComponent";

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    if (this.props.user) {
      http.get(`/bookmarks`)
        .then((res) => {
          this.setState({ bookmarks: res.data.data });
        })
    }
  }

  isBookmarked = (r) => {
    let found = this.state.bookmarks.find(b => b.username === r.username);
    if (found !== undefined) {
      return true;
    }
    return false;
  }

  bookmarkRestaurant = (restaurant) => {
    if (!this.isBookmarked(restaurant)) {
      http.post(`/restaurants/${restaurant.username}/bookmarks`)
        .then((res) => {
          http.get(`/bookmarks`)
            .then((res) => {
              this.setState({ bookmarks: res.data.data });
            })
        })
        .catch((err) => {
        })
    } else {
      http.delete(`/restaurants/${restaurant.username}/bookmarks`)
        .then((res) => {
          http.get(`/bookmarks`)
            .then((res) => {
              this.setState({ bookmarks: res.data.data });
            })
        })
        .catch((err) => {
        })
    }
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <Navbar user={user} history={this.props.history}/>
        <main ref="main">
          <section className="section">
            <Container className="pt-md">
              <h2>Bookmarks</h2>
              <Row>
                <Col>
                  {
                    this.state.bookmarks.map((r) => (
                      <SearchCard 
                        key={r.username} 
                        restaurant={r} 
                        bookmarked={this.isBookmarked(r)}
                        bookmark={() => this.bookmarkRestaurant(r)}
                      />
                    ))
                  }
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

function checkAuth(user, userType) {
  return !!(user && userType === 1);
}

export default requireAuthentication(Bookmarks, checkAuth, "/");