import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import  Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';

const toolbar = (props) => (
  <Navbar className={classes.Navbar} expand="lg" bg="dark" variant="dark" >
    <Navbar.Brand className={classes.Brand} >Mordor</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <NavDropdown alignRight title="Username" >
          <NavDropdown.Item >Profile</NavDropdown.Item>
          <NavDropdown.Item >SignIn</NavDropdown.Item>
          <NavDropdown.Item >SignUp</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item >SignOut</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default toolbar;