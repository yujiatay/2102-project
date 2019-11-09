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
      title: "Article Title",
      username: "Unknown",
      createdAt: -1,
      body: "Loading",
      comments: [],
      postIsLoading: true,
      commentsIsLoading: true
    }
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

    // Fetch article info
    this.fetchArticleBody(params.username, parseInt(params.createdAt));

    // Fetch comments
    this.fetchArticleComments(params.username, parseInt(params.createdAt));
  }

  getParams({ match }) {
    let { username, createdAt } = match.params;
    this.state.username = username;
    this.state.createdAt = createdAt;
  }

  fetchArticleBody(username, createdAt) {
    const url = 'http://localhost:8000/api/v1.0/diners/' + username + '/articles/' + createdAt;
    console.log(url.toString());
    // The API where we're fetching data from
    axios.get(url)     // We get a response and receive the data in JSON format...
      .then(response => response.data.data)
      // ...then we update the state of our application
      .then(
        data => {
          this.setState({
            title: data.title,
            body: data.content.toString(),
            postIsLoading: false
          });
          console.log(data.toString());
        }
      )
      // If we catch errors instead of a response, let's update the app
      .catch(error => {
        alert("Error fetching article body :( " + error);
        this.setState({
          postIsLoading: false,
        });
      });
  }

  fetchArticleComments(username, createdAt) {
    const url = 'http://localhost:8000/api/v1.0/diners/' + username + '/articles/' + createdAt + '/comments';
    // The API where we're fetching data from
    axios.get(url)     // We get a response and receive the data in JSON format...
      .then(response => response.data.data)
      // ...then we update the state of our application
      .then(
        data => {
          this.setState({
            comments: data,
            commentsIsLoading: false
          });
          console.log("Comments: " + data.toString());
        }
      )
      // If we catch errors instead of a response, let's update the app
      .catch(error => {
        alert("Error fetching comments :( " + error);
        this.setState({
          commentsIsLoading: false,
        });
      });
  }

  render() {
    const createdTimestamp = new Date(this.state.createdAt).toString();
    const { postIsLoading, commentsIsLoading, comments } = this.state;
    const { user } = this.props;
    return (
      <>
        <Navbar user={user} history={this.props.history} />
        <main ref="main">
          <Container className="my-lg">
            <h2>{this.state.title}</h2>
            <h6>Posted By: {this.state.username}</h6>
            <h6>Posted On: {createdTimestamp}</h6>
            <p></p>
            <div>
              {!postIsLoading ? <p>{this.state.body}</p> : (
                <p>Post Loading...</p>
              )}
            </div>
            <h3>Comments:</h3>
            <FormGroup>
              <Label for="exampleText">Add your comment here:</Label>
              <Input type="textarea" name="text" id="exampleText" />
              <p></p>
              <Button>Submit</Button>
            </FormGroup>
            <div>
              {!commentsIsLoading ? (
                comments.map(comment => {
                  const { username, content, createdAt, updatedAt } = comment;
                  return (
                    <div key={createdAt}>
                      <ArticleComment username = {username} createdAt={createdAt} updatedAt={createdAt} content={content} />
                    </div>
                  );
                })
              ) : (
                <p>Comments Loading...</p>
              )}
            </div>
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