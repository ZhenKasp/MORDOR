import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './Profile.module.css';
import axios from 'axios';
import getFormData from '../../utilities/getFormData';
import { createFlashMessage } from '../../store/actions';
import { useTranslation } from 'react-i18next';

const Profile = (props) => {
  const [user, setUser] = useState([]);
  const { t } = useTranslation();

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
      <h1>{t("Profile")}</h1>
      <Form
        onSubmit={(event) => confirmChanges(event)}
      >
        <Form.Group>
          <Form.Label>{t("First Name")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="text"
            required
            name="firstName"
            placeholder={t("First Name")}
            defaultValue={user.firstname}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("Last Name")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="text"
            required
            name="lastName"
            placeholder={t("Last Name")}
            defaultValue={user.lastname}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("Username")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="text"
            required
            name="userName"
            placeholder={t("Username")}
            defaultValue={user.username}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("Confirm changes")}
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
