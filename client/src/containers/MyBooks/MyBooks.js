import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from '../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';

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
        My Books
      </div>
      <div>
        <Button onClick={() => modalIsShownSet(true)}>
          Create New Book
        </Button>
      </div>
      <Modal show={modalIsShown} modalClosed={modalIsShownCancelHandler}>
        <h3>Create Book</h3>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" placeholder="Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Short description</Form.Label>
          <Form.Control required as="textarea" rows={3} placeholder="Short description" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control required as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button>Confirm</Button>
      </Modal>
    </div>
  )
}

export default MyBooks;
