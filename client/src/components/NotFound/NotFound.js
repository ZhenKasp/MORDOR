import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  let history = useHistory();
  return (
    <div className={classes.NotFound}>
      <h1>Hmmm...</h1>
      <h4>We can't seem to find the page you're looking for.</h4>
      <Button onClick={() => history.replace('/')}>Go to homepage</Button>
    </div>
  );
}

export default NotFound;
