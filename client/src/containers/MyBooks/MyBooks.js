import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import CreateBookModal from '../CreateBookModal/CreateBookModal';

const MyBooks = (props) => {
  const [modalIsShown, modalIsShownSet] = useState(false);

  const modalIsShownHandler = () => {
    modalIsShownSet(true);
  }

  const modalIsShownCancelHandler = () => {
    modalIsShownSet(false);
  }

  return (
    <div>
      <div>
        <h3>My Books</h3>
      </div>
      <div>
        <Button onClick={() => modalIsShownHandler()}>
          Create New Book
        </Button>
      </div>
      <CreateBookModal
        modalIsShownHandler={modalIsShownHandler}
        modalIsShownCancelHandler={modalIsShownCancelHandler}
        modalIsShown={modalIsShown} />
    </div>
  )
}

export default MyBooks;
