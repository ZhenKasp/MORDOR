import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import  Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';

const toolbar = (props) => (
  <Navbar
    className={classes.Toolbar}
    expand="md"
    bg="light"
    variant="light"
  >
    <Navbar.Brand
      className={classes.Brand}
      onClick={() => props.setView("index")}
    >
      <h4>Mordor</h4>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse>
      <NavigationItems />
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = state => ({ view: state.view })

const mapDispatchToProps = dispatch => (
  { setView: (view) => dispatch({ type: "SET_VIEW", view }) }
)

export default connect(mapStateToProps, mapDispatchToProps)(toolbar);
