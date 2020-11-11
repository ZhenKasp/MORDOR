import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './BookPreview.module.css';
import Aux from '../../hoc/Auxiliary';
import RatingField from '../RatingField/RatingField';

const bookPreview = props => (
  <div className={classes.Wrapper}>
    <h1>{props.book.name}</h1>
    <p>Tegs: {props.book.tags &&
      props.book.tags.split(";").map(tag => "#" + tag).join(" ")}</p>
    <p>Short Description: {props.book.short_description}</p>
    <p>Genre: {props.book.genre}</p>
    {props.book.chapters && props.book.chapters.length > 0 ? (
      <div>
        <div>
          <RatingField initialRating={props.book.rating} bookId={props.book.id} />
        </div>
        <Button onClick={() => {
          props.clickHandler("readBook", props.book.chapters[0].id, props.book.chapters)
        }}>Read</Button>
        <hr />
        <h3>Chapters</h3>
        <ol>
          {props.book.chapters.map(chapter => {
            return (
              <li
                className={classes.Chapter}
                key={chapter.id}
                onClick={() =>
                  props.clickHandler("readBook", chapter.id, props.book.chapters)
                }>
                {chapter.name}
              </li>
            )
          })}
        </ol>
      </div>
    ) :
    <Aux>
      <hr />
      <h4>No chapters</h4>
    </Aux>}
  </div>
)

export default bookPreview;
