import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import CreateBookModal from '../CreateBookModal/CreateBookModal';
import BookCard from '../../components/BookCard/BookCard';
import axios from 'axios';
import classes from './MyBooks.module.css'

const MyBooks = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [books, setBooks] = useState([]);

  const modalIsShownHandler = () => setModalIsShown(true);
  const modalIsShownCancelHandler = () => setModalIsShown(false);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "myBooks",
        { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setBooks(res.data.books);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, [])

  return (
    <div>
      <h2>My Books</h2>
      <Button onClick={() => modalIsShownHandler()}>
        Create New Book
      </Button>
      <CreateBookModal
        createFlashMessage={props.createFlashMessage}
        modalIsShownHandler={modalIsShownHandler}
        modalIsShownCancelHandler={modalIsShownCancelHandler}
        modalIsShown={modalIsShown} />

      <CardDeck className={classes.BooksGrid}>
      {books.map(book => (
        <BookCard book={book} key={book.id}>
          <Button variant="primary">Edit</Button>
          <Button variant="success">Read</Button>
          <Button variant="danger">Delete</Button>
        </BookCard>
      ))}
    </CardDeck>
    </div>
  )
}

export default MyBooks;
