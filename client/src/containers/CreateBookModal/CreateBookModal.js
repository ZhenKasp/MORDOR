import React, { useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import TagsInput from '../../containers/TagsInput/TagsInput';
import axios from 'axios';
import GenreSelector from '../../components/GenreSelector/GenreSelector';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import { useDropzone } from 'react-dropzone';
import classes from './CreateBookModal.module.css';

const CreateBookModal = (props) => {
  const [tags, setTags] = useState([]);
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const submitCreateBook = (event) => {
    event.preventDefault();
    const bookTags = tags.map(tag => tag.text).join(";");

    const object = new FormData(event.target);
    object.append('tags', bookTags);
    object.append('image', image);
    event.persist();

    axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'book',
      object, { headers: { authorization: props.user.token, 'Content-Type': 'multipart/form-data' }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        props.setBooks([...props.books, res.data.book]);
        props.modalIsShownCancelHandler();
        event.target.reset();
        setTags([]);
        setGenre("");
        setImage("");
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
        <Form onSubmit={submitCreateBook}>
          <h3>Create Book</h3>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              maxLength="255"
              required type="text"
              placeholder="Name"
              name="name"
            />
          </Form.Group>
          <Form.Group>
            <div {...getRootProps()} className={classes.Dropzone}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the image here ...</p> :
                  <p>Drag 'n' drop some image here, or click to select image</p>
              }
              {image &&
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.path}
                  className={classes.Image}
                />
              }
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Short description</Form.Label>
            <Form.Control
              name="short_description"
              required as="textarea"
              rows={3}
              placeholder="Short description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <GenreSelector
              genre={genre}
              handleChange={(e) => setGenre(e.target.value)}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBookModal);
