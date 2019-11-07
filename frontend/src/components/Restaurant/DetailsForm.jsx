import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class DetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  startEdit = () => {
    this.setState({editing: true});
  };

  cancelEdit = () => {
    this.setState({editing: false});
  };

  render() {
    const {editing} = this.state;
    return (
      <>
        <Form>
          <FormGroup row>
            <Label for="name">Restaurant Name</Label>
            <Input
              id="name"
              type="text"
              defaultValue={"ABC Foodings"}
              disabled={!editing}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="cuisine">Cuisine Type</Label>
            <Input type="select" name="select" id="cuisine" disabled={!editing}>
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
              disabled={!editing}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="opening">Opening Hours</Label>
            <Input
              id="opening"
              type="textarea"
              defaultValue={"Monday to Friday 8am - 8pm"}
              disabled={!editing}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="capacity">Maximum Capacity</Label>
            <Input
              id="capacity"
              type="number"
              defaultValue={1}
              disabled={!editing}
            />
          </FormGroup>
          {
            editing
              ? (
                <>
                  <Button onClick={this.cancelEdit}>Cancel</Button>
                  <Button>Submit</Button>
                </>
              )
              : <Button onClick={this.startEdit} block>Edit</Button>
          }
        </Form>
      </>
    );
  }
}

export default DetailsForm;