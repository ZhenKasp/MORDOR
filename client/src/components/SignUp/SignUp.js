import React from 'react';
import classes from './SignUp.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import submitAction from '../../utilities/submitAction';

const SignUp = (props) => (
  <div className={classes.SignUp}>
    <h1>Please Sign Up</h1>
    <Form onSubmit={(event) => submitAction(event, "signup", props.createFlashMessage, props.setToken)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control autoFocus type="email" required name="email" placeholder="Enter email" />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control autoFocus name="username" required placeholder="Username" />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control autoFocus name="firstname" required placeholder="First Name" />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control autoFocus name="lastname" required placeholder="Last Name" />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required name="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registration
      </Button>
    </Form>
  </div>
)

export default SignUp;