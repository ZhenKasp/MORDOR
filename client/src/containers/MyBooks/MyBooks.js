import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import CreateBookModal from '../CreateBookModal/CreateBookModal';
import CardBook from '../../components/CardBook/CardBook';
import axios from 'axios';
import classes from './MyBooks.module.css';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import Filters from '../Filters/Filters';
import Aux from '../../hoc/Auxiliary';
import { useTranslation } from 'react-i18next';

const MyBooks = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All");
  const { t } = useTranslation();

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "books/myBooks",
        { headers: { authorization: props.user.token }})
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
          {books.map(book => {
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
      <h2>{t("My Books")}</h2>
      <Button onClick={() => setModalIsShown(true)}>
        {t("Create New Book")}
      </Button>
      <hr />
      <Filters
        tags={currentTags}
        setTags={setCurrentTags}
        genre={currentGenre}
        setGenre={setCurrentGenre}
      />
      <CreateBookModal
        modalIsShownHandler={() => setModalIsShown(true)}
        modalIsShownCancelHandler={() => setModalIsShown(false)}
        modalIsShown={modalIsShown}
        books={books}
        setBooks={setBooks}
      />
      <Books />
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
