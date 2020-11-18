import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import  Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";

const Toolbar = (props) => {
  let history = useHistory();

  return (
    <Navbar
      className={classes.Toolbar}
      expand="md"
      bg="light"
      variant="light"
    >
      <Navbar.Brand
        className={classes.Brand}
        onClick={() => history.push("/")}
      >
        <h4>Mordor</h4>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <NavigationItems />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Toolbar;
