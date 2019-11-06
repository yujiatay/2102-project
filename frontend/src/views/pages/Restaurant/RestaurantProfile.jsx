import React from 'react';
import {
  Col, Container, Row,
  FormGroup, Label,
  Input, Form, Button,
} from 'reactstrap';

import Navbar from "components/Navbars/DarkNavBarRestaurant";
import MenuItemCard from "components/Restaurant/MenuItemCard";
import NewMenuItemCard from "components/Restaurant/NewMenuItemCard";

class RestaurantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: false,
    }
  }

  openNewItemForm = () => {
    this.setState({newItem: true});
  };

  closeNewItemForm = () => {
    this.setState({newItem: false});
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    const newItem = this.state.newItem;
    return (
      <>
        <Navbar/>
        <main ref="main">
          <section className="section">
            <Container className="pt-md align-content-md-center">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Restaurant Details</p>
                  <Form>
                    <FormGroup row>
                      <Label for="name">Restaurant Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={"ABC Foodings"}
                      />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="cuisine">Cuisine Type</Label>
                      <Input type="select" name="select" id="cuisine">
                        <option value={1}>Bakery</option>
                        <option value={2}>Dessert</option>
                        <option value={3}>Fast Food</option>
                        <option value={4}>Vegetarian</option>
                        <option value={11}>American</option>
                        <option value={12}>Chinese</option>
                        <option value={13}>French</option>
                        <option value={14}>Indian</option>
                        <option value={15}>Indonesia</option>
                        <option value={16}>Italian</option>
                        <option value={17}>Japanese</option>
                        <option value={18}>Korean</option>
                        <option value={19}>Mexican</option>
                        <option value={20}>Middle Eastern</option>
                        <option value={21}>Thai</option>
                        <option value={22}>Vietnamese</option>
                        <option value={23}>Western</option>
                      </Input>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        value={"8 Club Street S123456"}
                      />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="opening">Opening Hours</Label>
                      <Input
                        id="opening"
                        type="textarea"
                        value={"Monday to Friday 8am - 8pm"}
                      />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="capacity">Maximum Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={1}
                      />
                    </FormGroup>
                    <Button block>Edit</Button>
                  </Form>
                </Col>
              </Row>
            </Container>
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Menu Items</p>
                  {
                    newItem
                    ? <Button onClick={this.closeNewItemForm} block>Cancel</Button>
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
