import React from 'react';
import {
  Card, CardBody,
  CardTitle, Button, FormGroup, Label, Input, Form, Alert
} from 'reactstrap';
import { menuItemTypesList } from "../../constants";
import http from "../../http";

class NewMenuItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemType: 1,
      itemPrice: 0.0,
      itemDescription: "",
      image: "",

      alert: {
        visible: false,
        color: "primary",
        msg: ""
      }
    }
  }

  onValueChange(key) {
    return (e) => {
      const { target: { value } } = e;
      this.setState({
        [key]: value
      })
    }
  }

  setAlertVisible = (visible, color, msg) => {
    this.setState({
      alert: { visible, color, msg }
    });
  };

  submitNewItem = () => {
    const { itemName, itemType, itemPrice, itemDescription, image } = this.state;
    const body = {
      name: itemName,
      type: itemType,
      price: itemPrice,
      description: itemDescription,
      image
    };
    this.props.onCallback(http.post(`/restaurants/${this.props.restaurant.username}/menuitems`, body));
  };

  render() {
    const { itemName, itemType, itemPrice, itemDescription, image } = this.state;
    return (
      <>
        <Alert isOpen={this.state.alert.visible} color={this.state.alert.color}
               toggle={() => this.setState({ alert: { visible: false } })}
               style={{ zIndex: 1001, marginBottom: 0 }}
        >
          <span className="alert-inner--text">
            {this.state.alert.msg}
          </span>
        </Alert>
        <Card>
          <CardBody>
            <CardTitle>New Menu Item Details</CardTitle>
            <Form>
              <FormGroup row>
                <Label for="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  type="text"
                  value={itemName}
                  onChange={this.onValueChange("itemName")}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="itemType">Type</Label>
                <Input
                  type="select"
                  id="itemType"
                  value={itemType}
                  onChange={this.onValueChange("itemType")}
                >
                  {
                    menuItemTypesList.map(entry => {
                      const [name, value] = entry;
                      return <option value={value} key={value}>{name}</option>
                    })
                  }
                </Input>
              </FormGroup>
              <FormGroup row>
                <Label for="itemPrice">Price</Label>
                <Input
                  id="itemPrice"
                  type="number"
                  value={itemPrice}
                  onChange={this.onValueChange("itemPrice")}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="itemDescription">Description</Label>
                <Input
                  id="itemDescription"
                  type="textarea"
                  value={itemDescription}
                  onChange={this.onValueChange("itemDescription")}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="image">Link for Image</Label>
                <Input
                  id="image"
                  type="text"
                  value={image}
                  onChange={this.onValueChange("image")}
                />
              </FormGroup>
              <Button>Cancel</Button>
              <Button onClick={this.submitNewItem}>Confirm</Button>
            </Form>
          </CardBody>
        </Card>
      </>
    );
  };
}

export default NewMenuItemCard;