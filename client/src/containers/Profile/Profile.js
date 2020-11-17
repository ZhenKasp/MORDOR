import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './Profile.module.css';
import axios from 'axios';
import getFormData from '../../utilities/getFormData';
import { createFlashMessage } from '../../store/actions';

const Profile = (props) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "user",
        { params: { id: props.user.id },
          headers: { authorization: props.user.token }}
        )
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setUser(res.data.user);
        }
      })
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, []);

  const confirmChanges = event => {
    event.preventDefault();
    const object = getFormData(event);

    try {
      axios.patch(process.env.REACT_APP_PATH_TO_SERVER + 'user',
        object, { headers: { authorization: props.user.token }}
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          props.createFlashMessage(res.data.message, res.data.variant);
          props.setUser({
            id: res.data.user.id,
            token: props.user.token,
            username: res.data.user.username
          })
        }
      })
    } catch(err) {
      props.createFlashMessage(err.message, "danger");
    }
  }

  return (
    <div className={classes.SignIn}>
      <h1>Profile</h1>
      <Form
        onSubmit={(event) => confirmChanges(event)}
      >
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="text"
            required
            name="firstName"
            placeholder="Enter first name"
            defaultValue={user.firstname}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="text"
            required
            name="lastName"
            placeholder="Enter last name"
            defaultValue={user.lastname}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="text"
            required
            name="userName"
            placeholder="Enter username"
            defaultValue={user.username}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Confirm changes
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = state => { return { user: state.user } };

const mapDispatchToProps = dispatch => {
  return {
    setUser: value => dispatch({ type: "SET_USER", value }),
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
