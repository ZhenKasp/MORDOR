import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import TagsInput from '../../containers/TagsInput/TagsInput';
import axios from 'axios';
import getFormData from '../../utilities/getFormData';

const CreateBookModal = (props) => {
  const [tags, setTags] = useState([]);
  const GENRES = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Thriller",
    "Romance",
    "Westerns",
    "Dystopian",
    "Erotica",
  ]

  const submitCreateBook = (event) => {
    event.preventDefault();
    const object = getFormData(event);
    object["tags"] = tags.map(tag => tag.text).join(";");

    axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'book',
      object, { headers: { authorization: localStorage.getItem('token') }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
        props.modalIsShownCancelHandler();
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        props.setBooks([...props.books, res.data.book]);
        props.modalIsShownCancelHandler();
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
      props.modalIsShownCancelHandler();
    });
  }

  return (
    <div>
      <Modal
        show={props.modalIsShown}
        modalClosed={props.modalIsShownCancelHandler}
      >
        <Form
          onSubmit={submitCreateBook}>
          <h3>Create Book</h3>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required type="text"
              placeholder="Name"
              name="name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Short description</Form.Label>
            <Form.Control
              maxLength="255"
              name="short_description"
              required as="textarea"
              rows={3}
              placeholder="Short description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Control name="genre" required as="select">
              {GENRES.map(genre => <option key={genre}>{genre}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <TagsInput
              tags={tags}
              setTags={setTags}
            />
          </Form.Group>
          <Button type="submit">Confirm</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateBookModal;
