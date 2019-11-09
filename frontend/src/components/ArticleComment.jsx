import React from 'react';
import http from 'http.js';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import { requireAuthentication } from "../components/AuthenticatedComponent";

class ArticleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      content: props.content,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    }

    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }

  handleCommentDelete() {
    http.delete(`/diners/${this.state.username}/articles/${this.state.createdAt}`);
  }

  render() {
    const createdTimestamp = new Date(this.state.createdAt).toString();
    const updatedTimestamp = new Date(this.state.updatedAt).toString();
    const { user } = this.props;
    const isOwner = user == this.state.username;

    return (
      <>
        <div>
          <Card>
            <CardBody>
              <CardText>{this.state.content}</CardText>
              <CardTitle>Comment By: {this.state.username}</CardTitle>
              <CardSubtitle>Posted On: {createdTimestamp}</CardSubtitle>
              <p></p>
              <CardSubtitle>Last Edited: {updatedTimestamp}</CardSubtitle>
              <p></p>
              <div>
              {isOwner ? (
                <div>
                  <Button onClick={this.props.toggleCommentEditModal}>Edit</Button>
                  <Button onClick={this.handleCommentDelete}>Delete</Button>
                </div>
              ) : <p></p>}
            </div>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

function checkAuth() {
  return true;
}

export default requireAuthentication(ArticleComment, checkAuth);
