import React from 'react';
import classnames from "classnames";
import { Button, UncontrolledTooltip } from "reactstrap";

const BookmarkButton = (props) => {
  return (
    <>
      <Button
        aria-pressed={props.bookmarked}
        className={classnames("btn-icon btn-2", {
          active: props.bookmarked
        })}
        type="button"
        color="danger"
        outline
        onClick={props.bookmark}
        id={`bookmark-${props.rusername}`}
      >
        <span className="btn-inner--icon">
          <i className="fa fa-heart"/>
        </span>
      </Button>
      <UncontrolledTooltip
        delay={0}
        placement="bottom"
        target={`bookmark-${props.rusername}`}
      >
        Bookmark this restaurant
      </UncontrolledTooltip>
    </>
  )
};

export default BookmarkButton;