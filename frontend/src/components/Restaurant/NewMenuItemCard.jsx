import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
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
                <InputGroup
                  id="itemPrice"
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    value={itemPrice}
                    onChange={this.onValueChange("itemPrice")}
                  />
                </InputGroup>
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