import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import CreateBookModal from '../CreateBookModal/CreateBookModal';
import CardBook from '../../components/CardBook/CardBook';
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
      <hr />
      <CreateBookModal
        createFlashMessage={props.createFlashMessage}
        modalIsShownHandler={modalIsShownHandler}
        modalIsShownCancelHandler={modalIsShownCancelHandler}
        modalIsShown={modalIsShown}
        books={books}
        setBooks={setBooks}
      />
      <CardDeck className={classes.BooksGrid}>
      {books.map(book => (
        <CardBook
          book={book}
          key={book.id}
          clicked={props.clickHandler}
        >
        </CardBook>
      ))}
    </CardDeck>
    </div>
  )
}

export default MyBooks;
