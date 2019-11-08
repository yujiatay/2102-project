import React from 'react';

import {
  Row,
  Col,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import ReactDatetime from "react-datetime";

import Navbar from "components/Navbars/DarkNavbar.jsx";
import BookingCard from "components/BookingCard.jsx";
import classnames from 'classnames';
import { requireAuthentication } from "components/AuthenticatedComponent";
import http from "http.js";

class MyBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      activeTab: '1',
      unconfirmedRes: [],
      confirmedRes: [],
      pastRes: [],
    }
  }

  switchTab = (newTab) => {
    if (newTab !== this.state.activeTab) {
      this.setState({ activeTab: newTab });
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    http.get(`/diners/${this.props.user.username}/bookings`)
      .then((res) => {
        let reservations = res.data.data;
        let unconfirmed = reservations.filter(x => !x.isConfirmed);
        let confirmed = reservations.filter(x => x.isConfirmed);
        this.setState({
          unconfirmedRes: unconfirmed,
          confirmedRes: confirmed
        })
      })
    http.get(`/diners/${this.props.user.username}/bookings/history`)
      .then((res) => {
        this.setState({ pastRes: res.data.data })
      })
  }

  valid = (current) => {
    const yesterday = ReactDatetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  cancelBooking = (rusername, data) => {
    http.delete(`/restaurants/${rusername}/bookings/`, { params: data })
      .then((res) => {
        this.props.history.go(0);
      })
  }

  reviewBooking = (rusername, body, isEdit) => {
    if (!isEdit) {
      http.post(`/restaurants/${rusername}/reviews`, body)
    } else {
      http.patch(`/restaurants/${rusername}/reviews/${this.props.user.username}`, body)
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
                <h2>Upcoming Bookings</h2>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => this.switchTab('1')}
                      >
                        Requested
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => this.switchTab('2')}
                      >
                        Confirmed
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => this.switchTab('3')}
                      >
                        Past history
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <p></p>
                      {
                        this.state.unconfirmedRes.length > 0
                        ? <p>These are your unconfirmed reservations:</p>
                        : <p>You have no unconfirmed reservations.</p>
                      }
                      {
                        this.state.unconfirmedRes.map((res) => (
                          <Row key={`${res.createdAt}${res.restaurant}`} className="mb-4">
                            <Col sm="12">
                              <BookingCard
                                booking={res} 
                                cancellable={true}
                                onCancel={this.cancelBooking}
                                username={this.props.user.username}
                                history={this.props.history}
                              />
                            </Col>
                          </Row>
                        ))
                      }
                      
                    </TabPane>
                    <TabPane tabId="2">
                      <p></p>
                      {
                        this.state.confirmedRes.length > 0
                        ? <p>These are your confirmed reservations:</p>
                        : <p>You have no confirmed reservations.</p>
                      }
                      {
                        this.state.confirmedRes.map((res) => (
                          <Row key={`${res.createdAt}${res.restaurant}`} className="mb-4">
                            <Col sm="12">
                              <BookingCard 
                                booking={res}
                                cancellable={true}
                                onCancel={this.cancelBooking} 
                                onReview={this.reviewBooking}
                                username={this.props.user.username}
                                history={this.props.history}
                              />
                            </Col>
                          </Row>
                        ))
                      }
                    </TabPane>
                    <TabPane tabId="3">
                      <p></p>
                      {
                        this.state.pastRes.length > 0
                        ? <p>These are your past reservations:</p>
                        : <p>You have no past reservations.</p>
                      }
                      {
                        this.state.pastRes.map((res) => (
                          <Row key={`${res.createdAt}${res.restaurant}`} className="mb-4">
                            <Col sm="12">
                              <BookingCard 
                                booking={res}
                                cancellable={false}
                                onCancel={this.cancelBooking} 
                                onReview={this.reviewBooking}
                                username={this.props.user.username}
                                history={this.props.history}
                              />
                            </Col>
                          </Row>
                        ))
                      }
                    </TabPane>
                  </TabContent>
                </div>
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

export default requireAuthentication(MyBookings, checkAuth, "/");