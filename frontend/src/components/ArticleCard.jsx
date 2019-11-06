import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ArticleCard = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle><a href="/articleView">Article Title</a></CardTitle>
          <CardSubtitle>Posted By: John</CardSubtitle>
          <CardText>Posted on: 00:00:00 16 Aug 2019</CardText>
          <CardText>Number of comments: 3</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ArticleCard;