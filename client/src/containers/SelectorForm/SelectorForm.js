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
          createFlashMessage={this.props.flashMessageHandler}
          setView={this.props.setView}
          setToken={this.props.tokenHandler}
        />
      )
    } else if (this.props.view === "signup") {
      return (
        <SignUp
          createFlashMessage={this.props.flashMessageHandler}
          setView={this.props.setView}
          setToken={this.props.tokenHandler}
        />
      )
    } else {
      return (
        <IndexPage
          createFlashMessage={this.props.flashMessageHandler}
          setView={this.props.setView}
          setToken={this.props.tokenHandler}
          view={this.props.view}
        />
      )
    }
  }
}

export default SelectorForm;
