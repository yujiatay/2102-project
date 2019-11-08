import React from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import ReactDatetime from "react-datetime";
import { dayOfWeekList } from "../../constants";
import http from "../../http";

class NewAvailableSlotCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfWeek: 0,
      startTime: "00:00",
      endTime: "01:00",

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

  onTimeChange(key) {
    return (date) => {
      console.log(date.format('HH:mm'));
      this.setState({
        [key]: date.format('HH:mm')
      })
    }
  }

  submitNewSlot = () => {
    const { startTime, endTime, dayOfWeek} = this.state;
    const body = {
      startTime,
      endTime,
      dayOfWeek
    };
    this.props.onCallback(http.post(`/restaurants/${this.props.restaurant.username}/slots`, body));
  };

  render() {
    const { dayOfWeek } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>New Available Slot</CardTitle>
            <Form>
              <FormGroup row>
                <Label for="dayOfWeek">Day of Week</Label>
                <Input
                  id="dayOfWeek"
                  type="select"
                  value={dayOfWeek}
                  onChange={this.onValueChange("dayOfWeek")}
                >
                  {
                    dayOfWeekList.map((name, key) => {
                      return <option value={key}>{name}</option>
                    })
                  }
                </Input>
              </FormGroup>
              <FormGroup row>
                <Label for="startTime">Start Time</Label>
                <InputGroup id={"startTime"}>
                <ReactDatetime dateFormat={false}
                               onChange={this.onTimeChange("startTime")}/>
                </InputGroup>
              </FormGroup>
              <FormGroup row>
                <Label for="endTime">End Time</Label>
                <InputGroup id={"endTime"}>
                  <ReactDatetime dateFormat={false}
                                 onChange={this.onTimeChange("endTime")}/>
                </InputGroup>
              </FormGroup>
              <Button>Cancel</Button>
              <Button onClick={this.submitNewSlot}>Confirm</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };
}

export default NewAvailableSlotCard;