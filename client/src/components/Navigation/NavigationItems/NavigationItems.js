import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logout from '../../../utilities/logout';
import Nav from 'react-bootstrap/Nav';
import Aux from '../../../hoc/Auxiliary';

const navigationItems = (props) => {
  if (props.isAuthenticated()) {
    return (
      <Aux>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => props.viewHandler("createBook")}>Create</Nav.Link>
        </Nav>
        <NavDropdown alignRight title={localStorage.getItem("username") || "Guest"} >
          <NavDropdown.Item onClick={() => props.viewHandler("profile")}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={()=> logout(props.viewHandler, props.createFlashMessage)}>
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
        <NavDropdown alignRight title="Guest" >
          <NavDropdown.Item onClick={() => props.viewHandler("signin")}>
            SignIn
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => props.viewHandler("signup")}>
            SignUp
          </NavDropdown.Item>
        </NavDropdown>
      </Aux>
    )
  }
}

export default navigationItems;
