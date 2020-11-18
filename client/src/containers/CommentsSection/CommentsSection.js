import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import getFormData from '../../utilities/getFormData';
import classes from './CommentsSection.module.css'

const CommentsSection = props => {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "comments",
        {
          headers: { authorization: props.user.token },
          params: { id: props.id }
        }
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setComments(res.data.comments);
        }
      })
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }

useEffect(() => {
  getComments();
  const interval = setInterval(() => {
    getComments();
  }, 5000);
  return () => clearInterval(interval);
}, []);

  const submitCreateComment = (event) => {
    event.preventDefault();
    const object = getFormData(event);
    object["book_id"] = props.id;
    object["user_id"] = props.user.id;

    axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'comments',
      object, { headers: { authorization: props.user.token }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        let data = res.data.comment;
        data.user = { username: props.user.username };
        setComments([...comments, data]);

      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
    });
  }

  return (
    <div>
      <hr />
      <h2>Comments</h2>
      <Form onSubmit={submitCreateComment}>
        <Form.Group>
          <Form.Label>Your comment</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="text"
            placeholder="Comment"
            rows={1}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit comment
        </Button>
      </Form>
      <div className={classes.AllComments}>
        {comments.length > 0 ?
          comments.slice(0).reverse().map(comment => { return (
            <div key={comment.id} className={classes.Comment}>

              {comment.user?.username + ": " + comment.text}
            </div>

          )}):
          <p>No comments yet</p>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => dispatch({ type: "DELETE_USER" }),
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
