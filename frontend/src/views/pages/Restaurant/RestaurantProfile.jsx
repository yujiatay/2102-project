import React from 'react';
import { Alert, Button, Col, Container, Row, } from 'reactstrap';

import Navbar from "components/Navbars/DarkNavBarRestaurant";
import MenuItemCard from "components/Restaurant/MenuItemCard";
import NewMenuItemCard from "components/Restaurant/NewMenuItemCard";
import NewAvailableSlot from "components/Restaurant/NewAvailableSlotCard";
import AvailableSlotList from "components/Restaurant/AvailableSlotList";
import DetailsForm from "components/Restaurant/DetailsForm";
import { requireAuthentication } from "components/AuthenticatedComponent";
import http from "http.js";

class RestaurantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: false,
      newSlot: false,
      slots: [],
      menuItems: [],
      tags: [],
      allTags: [],

      menuAlert: {
        visible: false,
        color: "primary",
        msg: ""
      },
      slotAlert: {
        visible: false,
        color: "primary",
        msg: ""
      }
    }
  }

  setMenuItemAlertVisible = (visible, color, msg) => {
    this.setState({
      menuAlert: { visible, color, msg }
    });
  };

  setSlotAlertVisible = (visible, color, msg) => {
    this.setState({
      slotAlert: { visible, color, msg }
    });
  };


  newItemCallback(promise) {
    promise
      .then((res) => {
        this.setState({
          newItem: false
        });
        this.setMenuItemAlertVisible(true, "success", res.data.msg);
        this.fetchDetails();
      })
      .catch((err) => {
        if (err.response) {
          this.setMenuItemAlertVisible(true, "danger", err.response.data.msg);
        }
      })
  }

  newSlotCallback(promise) {
    promise
      .then((res) => {
        this.setState({
          newSlot: false
        });
        this.setSlotAlertVisible(true, "success", res.data.msg);
        this.fetchDetails();
      })
      .catch((err) => {
        if (err.response) {
          this.setSlotAlertVisible(true, "danger", err.response.data.msg);
        }
      })
  }

  modifySlotCallback(promise) {
    promise
      .then((res) => {
        this.setSlotAlertVisible(true, "success", res.data.msg);
        this.fetchDetails();
      })
      .catch((err) => {
        if (err.response) {
          this.setSlotAlertVisible(true, "danger", err.response.data.msg);
        }
      })
  }

  modifyItemCallback(promise) {
    promise
      .then((res) => {
        this.setMenuItemAlertVisible(true, "success", res.data.msg);
        this.fetchDetails();
      })
      .catch((err) => {
        if (err.response) {
          this.setMenuItemAlertVisible(true, "danger", err.response.data.msg);
        }
      })
  }

  async fetchDetails() {
    const slotResponse = await http.get(`/restaurants/${this.props.user.username}/slots`);
    const menuResponse = await http.get(`/restaurants/${this.props.user.username}/menuitems`);
    const restaurantResponse = await http.get(`restaurants/${this.props.user.username}`);
    const tagResponse = await http.get(`/tags`);

    this.setState({
      slots: slotResponse.data.data,
      menuItems: menuResponse.data.data,
      tags: restaurantResponse.data.data.tags.map((tag) => tag.tag),
      allTags: tagResponse.data.data.map((tag) => tag.name)
    })
  }

  openNewItemForm = () => {
    this.setState({ newItem: true });
  };


  openNewSlotForm = () => {
    this.setState({ newSlot: true });
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.fetchDetails();
  }

  render() {
    const { newItem, newSlot, slots, menuItems, tags, allTags } = this.state;
    const { user } = this.props;
    return (
      <>
        <Navbar user={user} history={this.props.history}/>
        <main ref="main">
          <section className="section">
            <Container className="pt-md align-content-md-center">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Restaurant Details</p>
                  <DetailsForm details={{tags: tags, ...user}} allTags={allTags}/>
                </Col>
              </Row>
            </Container>
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Available Slots for Booking</p>
                  <Alert isOpen={this.state.slotAlert.visible} color={this.state.slotAlert.color}
                         toggle={() => this.setState({ slotAlert: { visible: false } })}
                         style={{ zIndex: 1001, marginBottom: 0 }}
                  >
                    <span className="alert-inner--text">
                      {this.state.slotAlert.msg}
                    </span>
                  </Alert>
                  {
                    newSlot
                      ? null
                      : <Button onClick={this.openNewSlotForm} block>Add new slot</Button>
                  }
                  {
                    newSlot &&
                    <NewAvailableSlot restaurant={user} onCallback={this.newSlotCallback.bind(this)}/>
                  }
                  <AvailableSlotList restaurant={user} slots={slots} onCallback={this.modifySlotCallback.bind(this)}/>
                </Col>
              </Row>
            </Container>
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col xs="10">
                  <p className="h1">Menu Items</p>
                  <Alert isOpen={this.state.menuAlert.visible} color={this.state.menuAlert.color}
                         toggle={() => this.setState({ menuAlert: { visible: false } })}
                         style={{ zIndex: 1001, marginBottom: 0 }}
                  >
                    <span className="alert-inner--text">
                      {this.state.menuAlert.msg}
                    </span>
                  </Alert>
                  {
                    newItem
                      ? null
                      : <Button onClick={this.openNewItemForm} block>Add new item</Button>
                  }
                  {
                    newItem &&
                    <NewMenuItemCard restaurant={user} onCallback={this.newItemCallback.bind(this)}/>
                  }
                  {menuItems.map(menuItem => {
                    return <MenuItemCard item={menuItem} restaurant={user} key={menuItem.name}
                                         onCallback={this.modifyItemCallback.bind(this)}/>
                  })}
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    )
  }
}

function checkAuth(user, userType) {
  return !!(user && userType === 2);
}

export default requireAuthentication(RestaurantProfile, checkAuth, "/");