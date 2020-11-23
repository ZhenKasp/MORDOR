import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logout from '../../../utilities/logout';
import Nav from 'react-bootstrap/Nav';
import Aux from '../../../hoc/Auxiliary';
import classes from './NavigationItems.module.css';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../../store/actions';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const NavigationItems = (props) => {
  let history = useHistory();

  if (props.user.token.length > 0) {
    return (
      <Aux>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push("/myBooks")}>
            My Books
          </Nav.Link>
        </Nav>
        <Button
          variant={props.theme}
          className={classes.Theme}
          onClick={props.changeTheme}
        >
          Change theme
        </Button>
        <NavDropdown
          className={classes.Dropdown}
          title={props.user.username}
        >
          <NavDropdown.Item onClick={() => history.push("/profile")}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={()=> logout(history.push, props.createFlashMessage, props.deleteUser, props.user.token)}>
            SignOut
          </NavDropdown.Item>
        </NavDropdown>
      </Aux>
    )
  } else {
    return (
      <Aux>
        <Nav className="mr-auto" />
        <Button
          variant={props.theme}
          className={classes.Theme}
          onClick={props.changeTheme}
        >
          Change theme
        </Button>
        <NavDropdown className={classes.Dropdown} title="Guest" >
          <NavDropdown.Item onClick={() => history.push("/signin")}>
            SignIn
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => history.push("/signup")}>
            SignUp
          </NavDropdown.Item>
        </NavDropdown>
      </Aux>
    )
  }
}

const mapStateToProps = state => ({ user: state.user, theme: state.theme });

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => dispatch({ type: "DELETE_USER" }),
    changeTheme: () => dispatch({ type: "CHANGE_THEME" }),
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
