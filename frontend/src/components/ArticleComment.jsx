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
      ausername: props.ausername,
      acreatedAt: props.acreatedAt,
    }

    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }

  handleCommentDelete() {
    http.delete(`/diners/${this.state.ausername}/articles/${this.state.acreatedAt}/comments/${this.state.username}/${this.state.createdAt}`)
      .then(() => {
        this.props.onDelete();
      })
  }

  render() {
    const createdTimestamp = new Date(this.state.createdAt).toString();
    const updatedTimestamp = new Date(this.state.updatedAt).toString();
    const { user } = this.props;
    const isOwner = user.username === this.state.username;

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
                  <Button onClick={() => this.props.toggleCommentEditModal(this.state.username, this.state.createdAt)}>Edit</Button>
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
