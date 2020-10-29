import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import  Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

const toolbar = (props) => (
  <Navbar
    className={classes.Toolbar}
    expand="md"
    bg="light"
    variant="light"
  >
    <Navbar.Brand className={classes.Brand} onClick={() => props.setView("index")}>
      Mordor
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse>
      <NavigationItems
        setView={props.setView}
        isAuthenticated={props.isAuthenticated}
        setToken={props.setToken}
        createFlashMessage={props.createFlashMessage}
      />
    </Navbar.Collapse>
  </Navbar>
);

export default toolbar;
