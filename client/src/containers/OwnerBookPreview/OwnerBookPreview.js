import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TagsInput from '../TagsInput/TagsInput';
import GenreSelector from '../../components/GenreSelector/GenreSelector';
import classes from './OwnerBookPreview.module.css';
import getFormData from '../../utilities/getFormData';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import CreateChapterModal from '../CreateChapterModal/CreateChapterModal';
import Aux from '../../hoc/Auxiliary';
import { useHistory } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

const OwnerBoookPreview = props => {
  const [tags, setTags] = useState([]);
  const [genre, setGenre] = useState(props.book.genre || "");
  const [image, setImage] = useState(props.book.image);
  const [chapters, setChapters] = useState(props.book.chapters);
  const [modalIsShown, setModalIsShown] = useState(false);
  let history = useHistory();
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  useEffect(() => {
    setTags(props.book.tags ?
      props.book.tags.split(";").map(tag => ({ id: tag, text: tag })) : []
    );
    setGenre(props.book.genre);
    setImage(props.book.image);
    setChapters(props.book.chapters);
  }, [props.book]);

  const updateBook = (event) => {
    event.preventDefault();
    const bookTags = tags.map(tag => tag.text).join(";");

    const object = new FormData(event.target);
    object.append('tags', bookTags);
    object.append('image', image);
    object.append("id", props.book.id);

    try {
      axios.patch(process.env.REACT_APP_PATH_TO_SERVER + 'book',
        object, { headers: { authorization: props.user.token, 'Content-Type': 'multipart/form-data' }}
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          props.createFlashMessage(res.data.message, res.data.variant);
        }
      })
    } catch(err) {
      props.createFlashMessage(err.message, "danger");
    }
  }

  const deleteBook = id => {
    axios.delete(process.env.REACT_APP_PATH_TO_SERVER + 'book', {
      headers: { authorization: props.user.token },
      data: { id: id }
    }).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        history.push('/');
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
    });
  }

  const deleteChapter = (e, id) => {
    e.preventDefault();
    axios.delete(process.env.REACT_APP_PATH_TO_SERVER + 'chapter', {
      headers: { authorization: props.user.token },
      data: { id: id }
    }).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        const newChapters = [...chapters]
        const index = newChapters.findIndex((ch) => ch.id === id);
        if (index > -1) {
          newChapters.splice(index, 1);
        }
        setChapters(newChapters);
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
    });
  }

  return (
    <div className={classes.Wrapper}>
      <Form onSubmit={updateBook}>
        <Form.Group>
          <Form.Label><h3>Book name</h3></Form.Label>
          <Form.Control
            maxLength="255"
            defaultValue={props.book.name}
            name="name"
            placeholder="Book name"
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
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt={image.path}
                className={classes.Image}
              />
            }
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label><h3>Tags</h3></Form.Label>
          <TagsInput setTags={setTags} tags={tags} />
        </Form.Group>
        <Form.Group>
          <Form.Label><h3>Short description</h3></Form.Label>
          <Form.Control
            defaultValue={props.book.short_description}
            name="short_description"
            required as="textarea"
            rows={3}
            placeholder="Short description"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><h3>Genre</h3></Form.Label>
          <GenreSelector
            genre={genre}
            handleChange={(e) => setGenre(e.target.value)}
          />
        </Form.Group>
        <Button variant="warning" type="submit">Confirm changes</Button>
        <Button
          variant="danger"
          onClick={() => deleteBook(props.book.id)}
        >Delete Book</Button>
      {chapters && chapters.length > 0 ? (
        <Aux>
            <Button onClick={() => {
              props.clickHandler(
                `/bookPreview/${props.book.id}/readBook`,
                props.book.chapters[0].id,
                chapters
              );
            }}>Read</Button>
            <hr />
            <h3>Chapters</h3>
          <ol>
            {chapters.sort((a, b) => (a.id - b.id)).map(chapter => (
              <li
                className={classes.Chapter}
                key={chapter.id}
              >
                <p onClick={() => {
                  props.clickHandler(
                    `/bookPreview/${props.book.id}/editChapter`,
                    chapter.id,
                    chapters
                  );
                }}>{chapter.name}</p>
                <Button
                  variant="danger"
                  onClick={(e) => deleteChapter(e, chapter.id)}
                >Delete
                </Button>
              </li>
            )
          )}
          </ol>
        </Aux>
      ) : (
        <Aux>
          <hr />
          <h4>No chapters</h4>
        </Aux>
      )}
      </Form>
      <Button onClick={() => setModalIsShown(true)}>
        Create Chapter
      </Button>
      <CreateChapterModal
        modalIsShownHandler={() => setModalIsShown(true)}
        modalIsShownCancelHandler={() => setModalIsShown(false)}
        modalIsShown={modalIsShown}
        bookId={props.book.id}
        chapters={chapters}
        setChapters={setChapters}
      />
      <hr />
    </div>
  )
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerBoookPreview);
