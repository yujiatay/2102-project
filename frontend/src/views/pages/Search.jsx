import React from 'react';

import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container
} from "reactstrap";

import Navbar from "components/Navbars/DarkNavbar.jsx";

class Search extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <Navbar />
        <main ref="main">
          <section className="section">
            <Container>
              <Row>
                <Col xs="4">
                  <Card body outline color="dark">
                    <CardBody>
                      Some filter criteria
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <FormGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-zoom-split-in" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Search" type="text" />
                    </InputGroup>
                  </FormGroup>
                  {
                    [1,2,3].map((x) => (
                      <Card body outline color="dark">
                        <CardBody>
                          Res {x}
                        </CardBody>
                      </Card>
                    ))
                  }
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Search;