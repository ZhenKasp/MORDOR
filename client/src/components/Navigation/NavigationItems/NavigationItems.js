import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logout from '../../../utilities/logout';
import Nav from 'react-bootstrap/Nav';
import Aux from '../../../hoc/Auxiliary';
import classes from './NavigationItems.module.css';
import { connect } from 'react-redux';

const navigationItems = (props) => {
  if (props.user.token.length > 0) {
    return (
      <Aux>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => props.setView("myBooks")}>
            My Books
          </Nav.Link>
        </Nav>
        <NavDropdown
          className={classes.Dropdown}
          title={props.user.username}
        >
          <NavDropdown.Item onClick={() => props.setView("profile")}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={()=> logout(props.setView, props.createFlashMessage, props.deleteUser)}>
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

const mapStrateToProps = state => {
  return { user: state.user }
};

const mapDispatchToProps = dispatch => {
  return { deleteUser: () => dispatch({ type: "DELETE_USER" })}
}

export default connect(mapStrateToProps, mapDispatchToProps)(navigationItems);
