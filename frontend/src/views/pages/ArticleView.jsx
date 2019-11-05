import React from 'react';

import {
  Container,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import ReactDatetime from "react-datetime";

import Navbar from "components/Navbars/DarkNavbar.jsx";
import ArticleComment from "components/ArticleComment";

class ArticleView extends React.Component {
  constructor(props) {
    super(props);
  }

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
          <section className="section h-100vh">
            <Container className="my-lg">
              <h2>Article Title</h2>
              <h6>Posted By: John</h6>
              <h6>Posted On: 00:00:00 14th Aug 2019</h6>
              <h6>Last Edited: 01:00:00 17th Aug 2019</h6>
              <p></p>
              <p>
                Hi all! Just wanted to submit my review of the restaurant "Greens", which I checked out last weekend.
              </p>

              <h3>Comments:</h3>
              <FormGroup>
                <Label for="exampleText">Add your comment here:</Label>
                <Input type="textarea" name="text" id="exampleText" />
                <p></p>
                <Button>Submit</Button>
              </FormGroup>
              <ArticleComment />
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default ArticleView;