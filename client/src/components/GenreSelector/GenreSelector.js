import React from 'react';
import Form from 'react-bootstrap/Form';
import classes from './GenreSelector.module.css';

const GENRES = [
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Thriller",
  "Romance",
  "Westerns",
  "Dystopian",
  "Erotica",
];

const genreSelector = props => (
  <Form.Control
    className={classes.GenreSelector}
    name="genre"
    required as="select"
    value={props.genre || GENRES[0]}
    onChange={props.handleChange}
    >
      {props.defaultGenre ? <option key={props.defaultGenre} value={props.defaultGenre}>{props.defaultGenre}</option> : null}
    {GENRES.map(genre => <option key={genre} value={genre}>{genre}</option>)}
  </Form.Control>
)

export default genreSelector;
