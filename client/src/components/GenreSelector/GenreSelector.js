import React from 'react';
import Form from 'react-bootstrap/Form';

const GENRES = [
  "",
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
    name="genre"
    required as="select"
    value={props.genre}
    onChange={props.handleChange}
    >
    {GENRES.map(genre => <option key={genre} value={genre}>{genre}</option>)}
  </Form.Control>
)

export default genreSelector;
