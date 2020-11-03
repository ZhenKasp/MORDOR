import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardDeck from 'react-bootstrap/CardDeck';
import classes from './AllBooks.module.css';
import CardBook from '../../components/CardBook/CardBook';

const AllBooks = (props) => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "books")
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setAllBooks(res.data.books);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, [])

  return (
    <div>
      <CardDeck className={classes.BooksGrid}>
      {allBooks.map(book => (
        <CardBook
          clicked={props.clickHandler}
          book={book}
          key={book.id}
          clickHandler={props.clickHandler}
        />
      ))}
      </CardDeck>
    </div>
  )
}

export default AllBooks;