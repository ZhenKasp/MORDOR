import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import  Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";
import eye from '../../../assets/images/eye.png';
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import getFormData from '../../../utilities/getFormData';

const Toolbar = (props) => {
  let history = useHistory();

  const search = event => {
    event.preventDefault();
    const data = getFormData(event);
    history.push(`/search?against=${data.against}`);
  }

  return (
    <Navbar
      className={classes.Toolbar}
      expand="md"
      bg={props.theme === "dark" ? "light" : "dark"}
      variant={props.theme === "dark" ? "light" : "dark"}
    >
      <Navbar.Brand
        className={classes.Brand}
        onClick={() => history.push("/")}
      >
        <h4>M<img src={eye} style={{width: '15px'}} alt="" />rdor</h4>
      </Navbar.Brand>

      <Form inline
        className={classes.Search}
        onSubmit={(e) => search(e)}
      >
        <FormControl
          name="against"
          type="text"
          placeholder="Search"
        />
        <Button variant="outline-success" type="submit">Search</Button>
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <NavigationItems />
      </Navbar.Collapse>
    </Navbar>
  );
}
const mapStateToProps = state => ({ theme: state.theme})

export default connect(mapStateToProps)(Toolbar);
