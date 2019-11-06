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

class MyBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      modal: false,
      activeTab: '1' 
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
  }

  valid = (current) => {
    const yesterday = ReactDatetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal});
  }

  render() {
    return (
      <>
        <Navbar />
        <main ref="main">
          <section className="section h-100vh">
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
                      <p>These are your unconfirmed requests:</p>
                      <Row>
                        <Col sm="12">
                          <BookingCard />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12">
                          <BookingCard />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <p></p>
                      <p>These are your confirmed requests:</p>
                      <Row>
                        <Col sm="12">
                          <BookingCard onReviewClick={this.toggleModal}/>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12">
                          <BookingCard onReviewClick={this.toggleModal}/>
                        </Col>
                      </Row>
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

export default MyBookings;