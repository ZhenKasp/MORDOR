import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardDeck from 'react-bootstrap/CardDeck';
import classes from './AllBooks.module.css';
import CardBook from '../../components/CardBook/CardBook';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import Filters from '../Filters/Filters';
import Aux from "../../hoc/Auxiliary";
import { useTranslation } from 'react-i18next';

const AllBooks = (props) => {
  const [allBooks, setAllBooks] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All");
  const { t } = useTranslation();

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
  }, []);

  const shouldShown = book => {
    return (currentTags.length === 0 || currentTags.some(tag => (
      book.tags && book.tags.split(";").includes(tag.text)
    ))) && (book.genre === currentGenre || currentGenre === "All");
  }

  const Books = () => {
    let isOneShown = false;
    return (
      <Aux>
        <CardDeck className={classes.BooksGrid}>
          {allBooks.map(book => {
            if (shouldShown(book)) {
              isOneShown = true;
              return (
                <CardBook
                  clicked={props.clickHandler}
                  book={book}
                  key={book.id}
                />
              );
            } else {
              return null;
            }
          })}
        </CardDeck>
        {!isOneShown && <h4>No matches found</h4>}
      </Aux>
    )
  }

  return (
    <div>
      <h2>{t("Books")}</h2>
      <Filters
        tags={currentTags}
        setTags={setCurrentTags}
        genre={currentGenre}
        setGenre={setCurrentGenre}
      />
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

export default connect(null, mapDispatchToProps)(AllBooks);
