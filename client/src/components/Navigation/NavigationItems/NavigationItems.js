import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logout from '../../../utilities/logout';
import Nav from 'react-bootstrap/Nav';
import Aux from '../../../hoc/Auxiliary';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  if (props.isAuthenticated()) {
    return (
      <Aux>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => props.setView("myBooks")}>
            My Books
          </Nav.Link>
        </Nav>
        <NavDropdown
          className={classes.Dropdown}
          title={localStorage.getItem("username") || "Guest"}
        >
          <NavDropdown.Item onClick={() => props.setView("profile")}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={()=> logout(props.setView, props.createFlashMessage)}>
            SignOut
          </NavDropdown.Item>
        </NavDropdown>
      </Aux>
    )
  } else {
    return (
      <Aux>
        <Nav className="mr-auto">
          </Nav>
        <NavDropdown className={classes.Dropdown} title="Guest" >
          <NavDropdown.Item onClick={() => props.setView("signin")}>
            SignIn
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => props.setView("signup")}>
            SignUp
          </NavDropdown.Item>
        </NavDropdown>
      </Aux>
    )
  }
}

export default navigationItems;
