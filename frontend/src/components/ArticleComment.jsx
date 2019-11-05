import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ArticleComment = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardText>Hey there, thanks for sharing!</CardText>
          <CardTitle>Comment By: Paul</CardTitle>
          <CardSubtitle>Posted On: 00:00:00 18th Sept 2019 | Last Edited: 01:00:00 18th Sept 2019</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default ArticleComment;