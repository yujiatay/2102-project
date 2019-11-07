import React from 'react';
import axios from 'axios';

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
import { requireAuthentication } from "../../components/AuthenticatedComponent";

class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Unknown",
      createdAt: -1,
      body: "Loading",
      isLoading: true
    }
  }

  getParams({ match }) {
    let { username, createdAt } = match.params;
    this.state.username = username;
    this.state.createdAt = createdAt;
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    const { match: { params } } = this.props;
    this.setState({
      username: params.username,
      createdAt: parseInt(params.createdAt)
    })
    console.log(params);
  }

  fetchArticleBody() {
    // The API where we're fetching data from
    axios.get('http://localhost:8000/api/v1.0/diners/testdiner1/articles/1551456000000')     // We get a response and receive the data in JSON format...
      .then(response => response.data.data)
      // ...then we update the state of our application
      .then(
        data =>
          this.setState({
            body: data,
          })
      )
      // If we catch errors instead of a response, let's update the app
      .catch(error => {
        alert("Error fetching article body :( " + error);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const createdTimestamp = new Date(this.state.createdAt).toString();
    const isLoading = this.state.isLoading;
    const { user } = this.props;
    return (
      <>
        <Navbar user={user} history={this.props.history} />
        <main ref="main">
          <Container className="my-lg">
            <h2>Article Title</h2>
            <h6>Posted By: {this.state.username}</h6>
            <h6>Posted On: {createdTimestamp}</h6>
            <p></p>
            <div>
              {!isLoading ? <p>{this.state.body}</p> : (
                <p>Loading...</p>
              )}
            </div>
            <h3>Comments:</h3>
            <FormGroup>
              <Label for="exampleText">Add your comment here:</Label>
              <Input type="textarea" name="text" id="exampleText" />
              <p></p>
              <Button>Submit</Button>
            </FormGroup>
            <ArticleComment />
          </Container>
        </main>
      </>
    );
  }
}

function checkAuth() {
  return true;
}

export default requireAuthentication(ArticleView, checkAuth);