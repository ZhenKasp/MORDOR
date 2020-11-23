import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../../store/actions';

const ControlButtons = props => {
  const buttons = [
    { name: 'Block', variant: 'info', action: "block" },
    { name: 'Unlock', variant: 'info', action: "unblock" },
    { name: 'Verify', variant: 'info', action: "verify" },
    { name: 'Make Admin', variant: 'info', action: "makeAdmin" },
    { name: 'Remove Admin', variant: 'info', action: "removeAdmin" },
    { name: 'Remove', variant: 'info', action: "remove" }
  ];

  const clickAction = path => {
    const params = { ids: props.selectedIds.join(";") };
    try {
      axios.patch(process.env.REACT_APP_PATH_TO_SERVER + "users/" + path,
        params, { headers: { authorization: props.user.token }}
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          props.createFlashMessage(res.data.message, res.data.variant);
          props.handler(res.data.users)
        }
      })
    } catch(err) {
      props.createFlashMessage(err.message, "danger");
    }
  }

  return (
    <div>
      {buttons.map(button => (
        <Button
          key={button.action}
          variant={button.variant}
          onClick={() => clickAction(button.action)}
        >
          {button.name}
        </Button>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons);
