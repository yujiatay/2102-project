import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const BookingCard = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            Restaurant Name: Bread Street Kitchen
          </CardTitle>
          <CardSubtitle>
            Booking for: 18th December 2019
            <p></p>
            Number of Diners: 5
          </CardSubtitle>
          <CardText>Press the button below to withdraw or cancel your booking.</CardText>
          <Button>Cancel</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookingCard;