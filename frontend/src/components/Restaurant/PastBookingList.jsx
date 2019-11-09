import React from 'react';
import {
  Table, Button, Modal
} from 'reactstrap';
import { dayOfWeekList } from "../../constants";


const PastBookingList = (props) => {
  const { bookings } = props;

  return (
    <>
      <Table responsive>
        <thead>
        <tr>
          <th style={{ width: '25%' }}>Date</th>
          <th style={{ width: '10%' }}>Start Time</th>
          <th style={{ width: '10%' }}>End Time</th>
          <th style={{ width: '25%' }}>Diner</th>
          <th style={{ width: '10%' }}>Num Pax</th>
          <th style={{ width: '10%' }}>Message</th>
          <th style={{ width: '10%' }}>Confirmed</th>
        </tr>
        </thead>
        <tbody>
        {bookings.map(booking => {
          const { bookingDate, dayOfWeek, dusername, startTime, endTime, isConfirmed, message, pax } = booking;
          return (
            <tr key={`${dusername}${bookingDate}${startTime}${endTime}`}>
              <td>{new Date(bookingDate).toISOString().slice(0, 10)} ({dayOfWeekList[parseInt(dayOfWeek)]})</td>
              <td>{startTime.slice(0, 5)}</td>
              <td>{endTime.slice(0, 5)}</td>
              <td>{dusername}</td>
              <td>{pax}</td>
              <td>{message === "" ? "-" : message}</td>
              <td>{isConfirmed ? "Confirmed" : "Unconfirmed"}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </>
  );
};

export default PastBookingList;