import React, { useState, useEffect } from 'react';
import classes from './LastUpdatedBooks.module.css';
import CardDeck from 'react-bootstrap/CardDeck';
import CardBook from '../../components/CardBook/CardBook';
import Aux from '../../hoc/Auxiliary';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const LastUpdatedBooks = (props) => {
  const [lastUpdatedBooks, setLastUpdatedBooks] = useState([]);

  useEffect(()=> {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "books/lastUpdatedBooks")
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setLastUpdatedBooks(res.data.books);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
      console.log(err);
    }
  }, []);

  return (
    <Aux>
      <h2>Last Updated Books</h2>
        <CardDeck className={classes.BooksGrid}>

          {lastUpdatedBooks?.map(book => {
            return (
              <CardBook
                clicked={props.clickHandler}
                book={book}
                rating={(book.ratings.reduce((p,c) => p + c.value, 0) / book.ratings.length)}
                key={book.id}
                clickHandler={props.clickHandler}
              />
            )
          })}
        </CardDeck>
    </Aux>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(null, mapDispatchToProps)(LastUpdatedBooks);