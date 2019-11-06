import React from 'react';
import {
  Col, Container, Row,
  FormGroup, Label,
  Input, Form, Button,
} from 'reactstrap';

import Navbar from "components/Navbars/DarkNavBarRestaurant";
import MenuItemCard from "components/Restaurant/MenuItemCard";
import NewMenuItemCard from "components/Restaurant/NewMenuItemCard";
import NewAvailableSlot from "components/Restaurant/NewAvailableSlotCard";
import AvailableSlotList from "components/Restaurant/AvailableSlotList";
import DetailsForm from "components/Restaurant/DetailsForm";

class RestaurantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: false,
      newSlot: false
    }
  }

  openNewItemForm = () => {
    this.setState({newItem: true});
  };


  openNewSlotForm = () => {
    this.setState({newSlot: true});
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    const {newItem, newSlot} = this.state;
    return (
      <>
        <Navbar/>
        <main ref="main">
          <section className="section">
            <Container className="pt-md align-content-md-center">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Restaurant Details</p>
                  <DetailsForm/>
                </Col>
              </Row>
            </Container>
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Available Slots for Booking</p>
                  {
                    newSlot
                      ? null
                      : <Button onClick={this.openNewSlotForm} block>Add new slot</Button>
                  }
                  {
                    newSlot &&
                    <NewAvailableSlot/>
                  }
                  <AvailableSlotList/>
                </Col>
              </Row>
            </Container>
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Menu Items</p>
                  {
                    newItem
                      ? null
                      : <Button onClick={this.openNewItemForm} block>Add new item</Button>
                  }
                  {
                    newItem &&
                    <NewMenuItemCard/>
                  }
                  <MenuItemCard/>
                  <MenuItemCard/>
                  <MenuItemCard/>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    )
  }
}

export default RestaurantProfile;
