import React from 'react';
import { Card } from 'react-bootstrap';
import EmptyBook from '../../assets/images/empty-book.jpg';
import classes from './CardBook.module.css';

const cardBook = (props) => {
  return (
    <div className={classes.CardBook}>
      <Card onClick={() => props.clicked("bookPreview", props.book.id)}>
        <Card.Img variant="top" src={ props.book.image || EmptyBook } />
        <Card.Body>
          <Card.Title>{props.book.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.book.tags &&
              props.book.tags.split(";").map(tag => "#" + tag).join(" ")}
          </Card.Subtitle>
          <hr />
          <Card.Text>{props.book.short_description}</Card.Text>
        </Card.Body>
      </Card>
    </div>

  )
}

export default cardBook;
