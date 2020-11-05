import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import classes from './BookPreview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';

const BookPreview = (props) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "book",
        { params: { id: props.id, userId: localStorage.getItem("userId") },
          headers: { authorization: props.user.token }}
        )
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          console.log(res.data.isOwner);
          setBook(res.data.book);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, []);

  let chapters = [
    {id: 1, text: "qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop"},
    {id: 2, text: "qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop"},
    {id: 3, text: "qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop"},
    {id: 4, text: "qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop"},
  ]

  return (
    <div>
      <h1>{book.name}</h1>
      <p>{book.tags &&
        book.tags.split(";").map(tag => "#" + tag).join(" ")}</p>
      <p>{book.short_description}</p>
      <p>{book.genre}</p>
      <p>{book.updatedAt}</p>
      <h3>Chapters</h3>
      {chapters && chapters.length > 0 ? (
      // {book.chapters && book.chapters.length > 0 ? (
        <div>
          <ol>
            {chapters.map(chapter => {
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

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(BookPreview);
