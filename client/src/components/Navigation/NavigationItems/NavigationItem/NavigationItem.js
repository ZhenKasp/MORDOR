import React from 'react';
import classes from './NavigationItem.module.css';
import logout from '../../../../utilities/logout';

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <p className={props.active === props.children.toLowerCase() ? classes.active : null}
        onClick={() => {localStorage.getItem("token") ? 
          logout(props.changeView, props.setToken, props.createFlashMessage) :
          props.changeView(props.view)}}>
        {props.children}
      </p>
    </li>
  )
}

export default navigationItem;