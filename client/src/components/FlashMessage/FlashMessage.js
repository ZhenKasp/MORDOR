import React from 'react';
import classes from './FlashMessage.module.css';
import Alert from 'react-bootstrap/Alert';

const flashMessage = (props) => {
  return (
    <Alert
      className={classes.FlashMessage}
      variant={props.variant || "danger"}
    >
      {props.text}
    </Alert>
  )
}

export default flashMessage;
