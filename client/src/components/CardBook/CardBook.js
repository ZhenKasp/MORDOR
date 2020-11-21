import React from 'react';
import { Card } from 'react-bootstrap';
import EmptyBook from '../../assets/images/empty-book.jpg';
import classes from './CardBook.module.css';
import RatingField from '../../containers/RatingField/RatingField';

const cardBook = (props) => (
  <Card
    bg='light'
    text="dark"
    className={classes.CardBook}
    onClick={() => props.clicked("bookPreview", props.book.id)}
  >
    <div className={classes.ImagePlaceholder}>
      <Card.Img
        className={classes.Image}
        variant="top"
        src={ props.book.image || EmptyBook }
      />
    </div>
    <Card.Body className={classes.CardBody}>
      <Card.Title className={classes.OneLined}>{props.book.name}</Card.Title>
        <Card.Subtitle className="mb-1">
          {props.book.genre}
        </Card.Subtitle>
      <Card.Subtitle className={`mb-1 text-muted ${classes.OneLined}`}>
        {props.book.tags &&
          props.book.tags.split(";").map(tag => "#" + tag).join(" ")}
      </Card.Subtitle>
      <div className={classes.Rating}>
        <RatingField initialRating={props.book.rating} readonly />
      </div>
    </Card.Body>
  </Card>
)

export default cardBook;
