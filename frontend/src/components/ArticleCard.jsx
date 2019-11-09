import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
  }

  goToArticle() {
    return <Redirect to='/'/>
  }

  render() {
    const createdTimestamp = new Date(this.props.createdAt).toString();
    return (
      <>
        <div>
          <Card>
            <CardBody>
              <CardTitle><a href={"/articles/" + this.props.username + "/" + this.props.createdAt}>{this.props.title}</a></CardTitle>
              <CardSubtitle>Posted By: {this.props.username}</CardSubtitle>
              <CardText>Posted on: {createdTimestamp}</CardText>
            </CardBody>
          </Card>
        </div>
      </>
    )
  }
}

export default ArticleCard;