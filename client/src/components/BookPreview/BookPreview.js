import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './BookPreview.module.css';
import Aux from '../../hoc/Auxiliary';
import RatingField from '../../containers/RatingField/RatingField';

const bookPreview = props => (
  <div className={classes.Wrapper}>
    <h1>{props.book.name}</h1>
    {props.book.image &&
      <img className={classes.Image} src={props.book.image} alt={props.book.name} />}
    {props.book.tags &&
      <p><b>Tegs:</b> {props.book.tags.split(";").map(tag => "#" + tag).join(" ")}</p>}
    <p><b>Short Description:</b> {props.book.short_description}</p>
    <p><b>Genre:</b> {props.book.genre}</p>
    <p><b>Author:</b> {props.book.user?.firstname + " " + props.book.user?.lastname}</p>
    {props.book.chapters && props.book.chapters.length > 0 ? (
      <div>
        <div>
          <RatingField initialRating={props.book.rating} bookId={props.book.id} />
        </div>
        <Button onClick={() => {
          props.clickHandler(
            `/bookPreview/${props.book.id}/readBook`,
            props.book.chapters[0].id,
            [...props.book.chapters, props.book.id]
          )
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
                  props.clickHandler(
                    `/bookPreview/${props.book.id}/readBook`,
                    chapter.id,
                    props.book.chapters
                  )
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
