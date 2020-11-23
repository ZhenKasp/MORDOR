import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardDeck from 'react-bootstrap/CardDeck';
import CardBook from '../../components/CardBook/CardBook';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import classes from "./SearchResults.module.css";
import { useLocation } from "react-router-dom";

const SearchResults = (props) => {
  const [books, setBooks] = useState([]);
  let location = useLocation();

  const search = against => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "books/search",
        { params: { against }}
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setBooks(res.data.books);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }

  useEffect(() => {
    const match = location.search.match(/against=(.+)/i);
    if (match && match[1]) search(match[1]);
  }, [location]);

  return (
    <div>
      <h2>Books</h2>
      <CardDeck className={classes.BooksGrid}>
        {books.map(book => {
          return (
            <CardBook
              clicked={props.clickHandler}
              book={book}
              key={book.id}
            />
          );
        })}
      </CardDeck>
      {books?.length === 0 && <h4>No matches found</h4>}
    </div>
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

export default connect(null, mapDispatchToProps)(SearchResults);
