import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import TagsInput from '../../containers/TagsInput/TagsInput';
import GenreSelector from '../GenreSelector/GenreSelector';
import classes from './OwnerBookPreview.module.css';
import getFormData from '../../utilities/getFormData';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const OwnerBoookPreview = props => {
  const [tags, setTags] = useState([]);
  const [genre, setGenre] = useState(props.book.genre);

  useEffect(() => {
    setTags(props.book.tags ? props.book.tags.split(";").map(tag => ({ id: tag, text: tag })) : []);
  }, [props.book]);

  useEffect(() => {
    setGenre(props.book.genre);
  }, [props.book.genre]);

  const updateBook = (event) => {
    event.preventDefault();
    const object = getFormData(event);
    object["tags"] = tags.map(tag => tag.text).join(";");
    object["genre"] = genre;
    object["id"] = props.book.id;

    axios.patch(process.env.REACT_APP_PATH_TO_SERVER + 'book',
      object, { headers: { authorization: props.user.token }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
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
            defaultValue={props.book.name}
            name="name"
            placeholder="Book name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><h3>Tags</h3></Form.Label>
          <TagsInput setTags={setTags} tags={tags} />
        </Form.Group>

        <Form.Group>
          <Form.Label><h3>Short description</h3></Form.Label>
          <Form.Control
            defaultValue={props.book.short_description}
            maxLength="255"
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
        <Button>Read</Button>
        <hr />
        <h3>Chapters</h3>
        {props.chapters && props.chapters.length > 0 ? (
          <ol>
            {props.chapters.map(chapter => {
              return (
                <li
                  key={chapter.id}
                  onClick={() => console.log(chapter.text)}>
                  {chapter.text}
                </li>
              )
            })}
          </ol>
        ) : (
          <div>
            <p>No chapters</p>
            <FontAwesomeIcon icon={faPlusSquare} />
          </div>
        )}
      </Form>
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
