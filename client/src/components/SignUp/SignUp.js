import React from 'react';
import classes from './SignUp.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import signup from '../../utilities/signup';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const SignUp = (props) => {
  let history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={classes.SignUp}>
      <h1>{t("Please Sign Up")}</h1>
      <Form
        onSubmit={
          (event) => signup(
            event,
            "signup",
            props.createFlashMessage,
            history.push,
            props.setEmail
          )
        }
      >
        <Form.Group>
          <Form.Label>{t("Email address")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="email"
            required
            name="email"
            placeholder={t("Enter email")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("Username")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="username"
            required
            placeholder={t("Username")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("First Name")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="firstname"
            required
            placeholder={t("First Name")}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>{t("Last Name")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="lastname"
            required
            placeholder={t("Last Name")}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required
            name="password"
            placeholder={t("Password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("Registration")}
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

export default connect(null, mapDispatchToProps)(SignUp);
