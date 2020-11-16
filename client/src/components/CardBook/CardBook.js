import React from 'react';
import { Card } from 'react-bootstrap';
import EmptyBook from '../../assets/images/empty-book.jpg';
import classes from './CardBook.module.css';
import RatingField from '../../containers/RatingField/RatingField';

const cardBook = (props) => {
  return (
    <Card
      bg='light'
      text="dark"
      className={classes.CardBook}
      onClick={() => props.clicked("bookPreview", props.book.id)}
    >
      <Card.Img variant="top" src={ props.book.image || EmptyBook } />
      <Card.Body>
        <Card.Title>{props.book.name}</Card.Title>
          <Card.Subtitle className="mb-1">
            {props.book.genre}
          </Card.Subtitle>
        <Card.Subtitle className="mb-1 text-muted">
          {props.book.tags &&
            props.book.tags.split(";").map(tag => "#" + tag).join(" ")}
        </Card.Subtitle>
        <div className={classes.Rating}>
          <RatingField initialRating={props.rating} readonly />
        </div>
      </Card.Body>
    </Card>
  )
}

export default cardBook;
