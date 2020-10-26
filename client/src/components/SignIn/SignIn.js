import React from 'react';
import classes from './SignIn.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import submitAction from '../../utilities/submitAction';
 
const SignIn = (props) => (
  <div className={classes.SignIn}>
    <h1>Please Sign In</h1>
    <Form onSubmit={(event) => submitAction(event, "signin", props.createFlashMessage, props.setToken)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control autoFocus type="email" required name="email" placeholder="Enter email" />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required name="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  </div>
)

export default SignIn;