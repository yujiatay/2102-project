import React from 'react';
import {
  Card, CardBody,
  CardTitle, Button, FormGroup, Label, Input, Form
} from 'reactstrap';

const NewMenuItemCard = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>New Menu Item Details</CardTitle>
          <Form>
            <FormGroup row>
              <Label for="itemName">Item Name</Label>
              <Input
                id="name"
                type="text"
                defaultValue={"Waffles with Chicken"}
              />
            </FormGroup>
            <FormGroup row>
              <Label for="itemType">Type</Label>
              <Input
                id="itemType"
                defaultValue={"Main"}
              />
            </FormGroup>
            <FormGroup row>
              <Label for="itemPrice">Price</Label>
              <Input
                id="itemPrice"
                type="number"
                defaultValue={3.14}
              />
            </FormGroup>
            <FormGroup row>
              <Label for="itemDescription">Description</Label>
              <Input
                id="itemDescription"
                type="textarea"
                defaultValue={"The only other acceptable option."}
              />
            </FormGroup>
            <FormGroup row>
              <Label for="image">Link for Image</Label>
              <Input
                id="image"
                type="text"
                defaultValue={"https://via.placeholder.com/150"}
              />
            </FormGroup>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewMenuItemCard;