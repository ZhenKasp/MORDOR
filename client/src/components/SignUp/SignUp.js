import React from 'react';
import classes from './SignUp.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import submitAction from '../../utilities/submitAction';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const SignUp = (props) => (
  <div className={classes.SignUp}>
    <h1>Please Sign Up</h1>
    <Form
      onSubmit={
        (event) => submitAction(
          event,
          "signup",
          props.createFlashMessage,
          props.setView,
          props.setUser
        )
      }
    >
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          maxLength="255"
          autoFocus
          type="email"
          required
          name="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          maxLength="255"
          autoFocus
          name="username"
          required
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          maxLength="255"
          autoFocus
          name="firstname"
          required
          placeholder="First Name"
        />
      </Form.Group>
      <Form.Group >
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          maxLength="255"
          autoFocus
          name="lastname"
          required
          placeholder="Last Name"
        />
      </Form.Group>
      <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control
          maxLength="255"
          type="password"
          required
          name="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registration
      </Button>
    </Form>
  </div>
)

const mapDispatchToProps = dispatch => {
  return {
    setView: view => dispatch({ type: "SET_VIEW", view }),
    setUser: value => dispatch({ type: "SET_USER", value }),
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(null, mapDispatchToProps)(SignUp);
