import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const BookPreview = (props) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "book",
        { params: { id: props.id }, headers: { authorization: localStorage.getItem('token') }}
        )
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setBook(res.data.book);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, []);

  return (
    <div>
      <h1>{book.name}</h1>
      <p>{book.tags &&
        book.tags.split(";").map(tag => "#" + tag).join(" ")}</p>
      <p>{book.short_description}</p>
      <p>{book.genre}</p>
      <p>{book.updatedAt}</p>
      {book.chapters && book.chapters.length > 0 ? (
        <div>
          <h3>Chapters</h3>
          <ul>
            <li>
              {book.chapters}
            </li>
          </ul>
        </div>
      ): <h2>No chapters</h2>}

      <div>
        <h2>Comments</h2>
        <Form>
          <Form.Group>
            <Form.Label>Your comment</Form.Label>
            <Form.Control
              type="text"
              required
              name="text"
              placeholder="Comment"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Write comment
          </Button>
        </Form>
      </div>
    </div>

  )
}

export default BookPreview;
