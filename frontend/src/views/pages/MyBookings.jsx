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
import ReviewModal from 'components/ReviewModal.jsx'
import classnames from 'classnames';
import { requireAuthentication } from "components/AuthenticatedComponent";
import http from "http.js";

class MyBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      modal: false,
      activeTab: '1',
      unconfirmedRes: [],
      confirmedRes: [],
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
        console.log(reservations)
        let unconfirmed = reservations.filter(x => !x.isConfirmed);
        let confirmed = reservations.filter(x => x.isConfirmed);
        this.setState({
          unconfirmedRes: unconfirmed,
          confirmedRes: confirmed
        })
      })
  }

  valid = (current) => {
    const yesterday = ReactDatetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  cancelBooking = (rusername, data) => {
    console.log(data)
    http.delete(`/restaurants/${rusername}/bookings/`, { params: data })
      .then((res) => {
        console.log(res)

      })
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal});
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <Navbar user={user} history={this.props.history}/>
        <main ref="main">
          <section className="section">
            <Container className="my-lg">
                <h2>Bookings</h2>
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
                          <Row key={`${res.createdAt}${res.restaurant}`}>
                            <Col sm="12">
                              <BookingCard booking={res} onCancel={this.cancelBooking}/>
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
                          <Row key={`${res.createdAt}${res.restaurant}`}>
                            <Col sm="12">
                              <BookingCard booking={res} onReviewClick={this.toggleModal}/>
                            </Col>
                          </Row>
                        ))
                      }
                    </TabPane>
                  </TabContent>
                </div>
                <ReviewModal isOpen={this.state.modal} toggleModal={this.toggleModal}/>
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