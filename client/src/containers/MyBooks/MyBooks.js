import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import CreateBookModal from '../CreateBookModal/CreateBookModal';
import CardBook from '../../components/CardBook/CardBook';
import axios from 'axios';
import classes from './MyBooks.module.css';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const MyBooks = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [books, setBooks] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "myBooks",
        { headers: { authorization: props.user.token }})
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setBooks(res.data.books);
          setRatings(res.data.ratings);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, [])

  return (
    <div>
      <h2>My Books</h2>
      <Button onClick={() => setModalIsShown(true)}>
        Create New Book
      </Button>
      <hr />
      <CreateBookModal
        modalIsShownHandler={() => setModalIsShown(true)}
        modalIsShownCancelHandler={() => setModalIsShown(false)}
        modalIsShown={modalIsShown}
        books={books}
        setBooks={setBooks}
      />
      <CardDeck className={classes.BooksGrid}>
        {books.map(book => (
          <CardBook
            book={book}
            rating={ratings.find(rating => rating.id === book.id) || 0}
            key={book.id}
            clicked={props.clickHandler}
          >
          </CardBook>
        ))}
    </CardDeck>
    </div>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
