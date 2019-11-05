import React from 'react';
import {
  Container, Row, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, Form
} from 'reactstrap';

import Navbar from "components/Navbars/DarkNavBarRestaurant";
import BookingList from "../../../components/Restaurant/BookingList";
import ReactDatetime from "react-datetime";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      modal: false,
      activeTab: '1'
    }
  }

  switchTab = (newTab) => {
    if (newTab !== this.state.activeTab) {
      this.setState({ activeTab: newTab });
    }
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <Navbar/>
        <main ref="main">
          <section className="section h-100vh">
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col xs="3">
                  <Form>
                    <FormGroup>
                      <Label for="date">Date</Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Choose a date"
                          }}
                          timeFormat={false}
                          defaultValue={Date.now()}
                          isValidDate={this.valid}
                          onChange={e => this.setState({ date: e })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    <Label for="status">Status</Label>
                    <Input type="select" name="select" id="status">
                      <option>Confirmed</option>
                      <option>Unconfirmed</option>
                      <option>All</option>
                    </Input>
                  </FormGroup>
                  </Form>
                </Col>
                <Col>
                  <BookingList/>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    )
  }
}

export default Dashboard;
