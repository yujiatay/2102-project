import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class ArticleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      content: props.content,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt
    }
  }

  render() {
    const createdTimestamp = new Date(this.state.createdAt).toString();
    const updatedTimestamp = new Date(this.state.updatedAt).toString();

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

            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

export default ArticleComment;