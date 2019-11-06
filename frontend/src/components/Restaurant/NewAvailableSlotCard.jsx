import React from 'react';
import {
  Card, CardBody,
  CardTitle, Button, FormGroup, Label, Input, Form
} from 'reactstrap';

const NewAvailableSlotCard = (props) => {
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
              >
                <option value={0}>Sunday</option>
                <option value={0}>Monday</option>
                <option value={0}>Tuesday</option>
                <option value={0}>Wednesday</option>
                <option value={0}>Thursday</option>
                <option value={0}>Friday</option>
                <option value={0}>Saturday</option>
              </Input>
            </FormGroup>
            <FormGroup row>
              <Label for="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="select"
              >
                <option value={'00:00'}>00:00</option>
                <option value={'00:30'}>00:30</option>
                <option value={'01:00'}>01:00</option>
                <option value={'01:30'}>01:30</option>
              </Input>
            </FormGroup>
            <FormGroup row>
              <Label for="endTime">End Time</Label>
              <Input
                id="endTime"
                type="select"
              >
                <option value={'00:00'}>00:00</option>
                <option value={'00:30'}>00:30</option>
                <option value={'01:00'}>01:00</option>
                <option value={'01:30'}>01:30</option>
              </Input>
            </FormGroup>
            <Button block>Confirm</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewAvailableSlotCard;