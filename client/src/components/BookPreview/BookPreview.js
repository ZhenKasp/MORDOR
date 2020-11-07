import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './BookPreview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

const bookPreview = props => (
  <div>
    <h1>{props.book.name}</h1>
    <Button>Read</Button>
    <p>{props.book.tags &&
      props.book.tags.split(";").map(tag => "#" + tag).join(" ")}</p>
    <p>{props.book.short_description}</p>
    <p>{props.book.genre}</p>
    <p>{props.book.updatedAt}</p>
    <h3>Chapters</h3>
    {props.chapters && props.chapters.length > 0 ? (
      <div>
        <ol>
          {props.chapters.map(chapter => {
            return (
              <li
                className={classes.Chapter}
                key={chapter.id}
                onClick={() => console.log(chapter.text)}>
                {chapter.text}
              </li>
            )
          })}
        </ol>
      </div>
    ) :
      <div>
        <p>No chapters</p>
        <FontAwesomeIcon className={classes.Pluss} icon={faPlusSquare} />
      </div>}
  </div>
)

export default bookPreview;
