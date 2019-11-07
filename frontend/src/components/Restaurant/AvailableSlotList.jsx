import React from 'react';
import {
  Table
} from 'reactstrap';

const AvailableSlotList = (props) => {
  return (
    <div>
      <Table>
        <thead>
        <tr>
          <th style={{width: '40%'}}>Day of Week</th>
          <th style={{width: '30%'}}>Start Time</th>
          <th style={{width: '30%'}}>End Time</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Monday</td>
          <td>08:00</td>
          <td>09:00</td>
        </tr>
        <tr>
          <td>Monday</td>
          <td>09:00</td>
          <td>10:00</td>
        </tr>
        <tr>
          <td>Monday</td>
          <td>10:00</td>
          <td>11:00</td>
        </tr>
        <tr>
          <td>Monday</td>
          <td>11:00</td>
          <td>12:00</td>
        </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default AvailableSlotList;