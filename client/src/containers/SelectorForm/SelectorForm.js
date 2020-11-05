import React, { Component } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import IndexPage from '../IndexPage/IndexPage';

class SelectorForm extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.view !== this.props.view;
  }

  render () {
    console.log(this.props.view);
    if (this.props.view === "signin") {
      return (
        <SignIn
          setView={this.props.setView}
        />
      )
    } else if (this.props.view === "signup") {
      return (
        <SignUp
          setView={this.props.setView}
        />
      )
    } else {
      return (
        <IndexPage
          setView={this.props.setView}
          view={this.props.view}
        />
      )
    }
  }
}

export default SelectorForm;
