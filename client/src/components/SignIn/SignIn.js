import React from 'react';
import classes from './SignIn.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import signin from '../../utilities/signin';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const SignIn = (props) => {
  let history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={classes.SignIn}>
      <h1>{t("Please Sign In")}</h1>
      <Form
        onSubmit={(event) => signin(
          event,
          "signin",
          props.createFlashMessage,
          history.push,
          props.setUser
        )}
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required name="password"
            placeholder={t("Password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("Sign In")}
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
