import React from 'react';
import classes from './SignIn.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import submitAction from '../../utilities/submitAction';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import { useHistory } from "react-router-dom";

const SignIn = (props) => {
  let history = useHistory();

  return (
    <div className={classes.SignIn}>
      <h1>Please Sign In</h1>
      <Form
        onSubmit={(event) => submitAction(
          event,
          "signin",
          props.createFlashMessage,
          history.push,
          props.setUser
        )}
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: value => dispatch({ type: "SET_USER", value }),
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(null, mapDispatchToProps)(SignIn);
