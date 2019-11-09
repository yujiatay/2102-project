import React from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';

import Navbar from "components/Navbars/DarkNavBarRestaurant";
import ReactDatetime from "react-datetime";
import { requireAuthentication } from "components/AuthenticatedComponent";
import http from "http.js";
import { getCurrentUnixTimestamp, getUnixTimestamp } from "utils.js";

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      timeSlotPopularity: [],
      datePopularity: [],

      alert: {
        visible: false,
        color: "primary",
        msg: ""
      },
    }
  }

  async fetchAnalytics() {
    const { startDate, endDate } = this.state;
    const dateQuery = {
      min: startDate ? getUnixTimestamp(startDate) : getCurrentUnixTimestamp(),
      max: endDate ?  getUnixTimestamp(endDate) : getCurrentUnixTimestamp(),
    };

    const timeslotResponse = await http.get(`/analytics/popularity/timeslot`, {params: dateQuery});
    const dateResponse = await http.get(`/analytics/popularity/date`, {params: dateQuery});

    console.log("TIMESLOTS:", timeslotResponse.data.data)
    console.log("DATES:", dateResponse.data.data)
    this.setState({
      timeSlotPopularity: timeslotResponse.data.data,
      datePopularity: dateResponse.data.data
    })
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  setAlertVisible = (visible, color, msg) => {
    this.setState({
      alert: { visible, color, msg }
    });
  };


  onTimeChange(key) {
    return (date) => {
      this.setState({
        [key]: date.toDate()
      })
    }
  }

  render() {
    const { user } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <>
        <Alert isOpen={this.state.alert.visible} color={this.state.alert.color}
               toggle={() => this.setState({ alert: { visible: false } })}
               style={{ zIndex: 1001, marginBottom: 0 }}
        >
          <span className="alert-inner--text">
            {this.state.alert.msg}
          </span>
        </Alert>
        <Navbar user={user} history={this.props.history}/>
        <main ref="main">
          <section className="section h-100vh">
            <Container className="pt-md">
              <Row className="justify-content-md-center">
                <Col>
                  <p className="h1">Analytics</p>
                  <Form inline>
                    <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                      <Label for="sdate" className="mr-sm-2">Start Date</Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Choose a start date"
                          }}
                          timeFormat={false}
                          value={startDate}
                          onChange={this.onTimeChange("startDate")}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                      <Label for="edate" className="mr-sm-2">End Date</Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Choose an end date"
                          }}
                          timeFormat={false}
                          value={endDate}
                          onChange={this.onTimeChange("endDate")}
                        />
                      </InputGroup>
                    </FormGroup>
                    <Button onClick={this.fetchAnalytics.bind(this)}>Analyse</Button>
                  </Form>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                <p className="h3">Popularity by Timeslots</p>
                {"INSERT CHART HERE"}
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                <p className="h3">Popularity by Date</p>
                {"INSERT CHART HERE"}
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    )
  }
}

function checkAuth(user, userType) {
  return !!(user && userType === 2);
}

export default requireAuthentication(Analytics, checkAuth, "/");
