import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardDeck from 'react-bootstrap/CardDeck';
import classes from './FilteredBooks.module.css';
import CardBook from '../../components/CardBook/CardBook';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import Filters from '../Filters/Filters';

const FilteredBooks = (props) => {
  const [allBooks, setAllBooks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "books")
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setAllBooks(res.data.books);
          setRatings(res.data.ratings);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, []);

  const returnBooks = () => {
    return (
      <CardDeck className={classes.BooksGrid}>
        {allBooks.map(book => {
          if (currentTags.length === 0  || currentTags.map(tag => (
            book.tags && book.tags.split(";").includes(tag.text)
          )).includes(true)) {
            return (
              <CardBook
                clicked={props.clickHandler}
                book={book}
                rating={ratings.find(rating => rating.id === book.id)?.rating || 0}
                key={book.id}
                clickHandler={props.clickHandler}
              />
            );
          } else {
            return null;
          }
        })}
      </CardDeck>
    )
  }

  const Books = returnBooks;

  return (
    <div>
      <Filters tags={currentTags} setTags={setCurrentTags} />
      <Books />
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

export default connect(null, mapDispatchToProps)(FilteredBooks);
