import React from 'react';
import {
  Table
} from 'reactstrap';

const BookingList = (props) => {
  return (
    <div>
      <Table>
        <thead>
        <tr>
          <th style={{width: '20%'}}>Date</th>
          <th style={{width: '10%'}}>Start Time</th>
          <th style={{width: '10%'}}>End Time</th>
          <th style={{width: '30%'}}>Diner</th>
          <th style={{width: '10%'}}>Num Pax</th>
          <th style={{width: '20%'}}>Confirmed</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>2019-11-12</td>
          <td>08:00</td>
          <td>09:00</td>
          <td>Mark Zuck Himself</td>
          <td>5</td>
          <td>Confirmed</td>
        </tr>
        <tr>
          <td>2019-11-12</td>
          <td>08:00</td>
          <td>09:00</td>
          <td>Mark Twain</td>
          <td>5</td>
          <td>Unconfirmed</td>
        </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default BookingList;