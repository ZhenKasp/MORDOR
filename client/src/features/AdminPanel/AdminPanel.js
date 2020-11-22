import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import classes from './AdminPanel.module.css';
import UserRow from './UserRow/UserRow';
import ControlButtons from './ControlButtons/ControlButtons';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import { Redirect } from "react-router-dom";

class AdminPanel extends Component {
  state = {
    selectedCheckboxes: [],
    users: [],
    allChecked: false,
    anyChanged: false,
    is_admin: true
  }

  allCheckedHandler = () => {
    this.setState({ allChecked: !this.state.allChecked, anyChanged: true })
  }

  cleanSelectedChecboxes = () => {
    this.setState({selectedCheckboxes: [], allChecked: false, anyChanged: false})
  }

  checkedHandler = () => {
    const checked = !this.state.allChecked
    if (checked) {
      this.setState({ selectedCheckboxes: this.state.users.map(user => user.id) });
    } else if (!this.state.anyChanged) {
      this.setState({ selectedCheckboxes: [] });
    }
    this.setState({ allChecked: checked, anyChanged: false});
  }

  handler = (value) => {
    this.setState({ users: value })
    const currentUser = value.find(user => user.id === this.props.user.id);
    if (!currentUser || currentUser.is_blocked) {
      this.props.deleteUser();
      this.setState({ is_admin: false });
    }
  }

  setChecked = (id) => {
    let checkboxes = this.state.selectedCheckboxes
    checkboxes.push(id);
    this.setState({ selectedCheckboxes: checkboxes, anyChanged: true });
  }

  unsetChecked = (id) => {
    let checkboxes = this.state.selectedCheckboxes
    let index = checkboxes.indexOf(id);
    checkboxes.splice(index, 1);
    this.setState({ selectedCheckboxes: checkboxes });
  }

  componentDidMount(){
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "users",
        { headers: { authorization: this.props.user.token }}
      ).then(res => {
        if (res.data.error) {
          this.props.createFlashMessage(res.data.error, res.data.variant);
          this.setState({ is_admin: false });
        } else {
          this.setState({ users: res.data.users });
        }
      });
    } catch (err) {
      this.props.createFlashMessage(err.message, "danger");
    }
  }

  render() {
    const { users, allChecked, anyChanged, selectedCheckboxes } = this.state;

    return (
      <div className={classes.UsersTable}>
        {!this.state.is_admin && <Redirect to="/" />}
        <ControlButtons selectedIds={selectedCheckboxes} handler={this.handler} />
        <div className={classes.Table}>
          <Table striped bordered hover size="sm" className={classes.UsersTable}>
            <thead>
              <tr>
                <th><Form.Check type="checkbox" checked={allChecked} onChange={this.checkedHandler} /></th>
                <th>#</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Admin</th>
                <th>Blocked</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <UserRow
                  key={user.id}
                  user={user}
                  allChecked={allChecked}
                  anyChanged={anyChanged}
                  resetAllChecked={this.allCheckedHandler}
                  setChecked={this.setChecked}
                  unsetChecked={this.unsetChecked}
                  selectedCheckboxes={selectedCheckboxes}
                  checked={selectedCheckboxes.includes(user.id)}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => dispatch({ type: "DELETE_USER" }),
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
