import React from 'react';
import { Card } from 'react-bootstrap';
import EmptyBook from '../../assets/images/empty-book.jpg';
import classes from './CardBook.module.css';
import RatingField from '../RatingField/RatingField';

const cardBook = (props) => {
  return (
    <Card className={classes.CardBook} onClick={() => props.clicked("bookPreview", props.book.id)}>
      <Card.Img variant="top" src={ props.book.image || EmptyBook } />
      <Card.Body>
        <Card.Title>{props.book.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.book.tags &&
            props.book.tags.split(";").map(tag => "#" + tag).join(" ")}
        </Card.Subtitle>
        <div className={classes.Rating}>
          <RatingField initialRating={props.rating} readonly />
        </div>
        <hr />
        <Card.Text className={classes.Description}>{props.book.short_description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default cardBook;
