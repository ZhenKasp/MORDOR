import React, { Component } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import IndexPage from '../IndexPage/IndexPage';
import { connect } from 'react-redux';

class SelectorForm extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.view !== this.props.view;
  }

  render () {
    if (this.props.view === "signin") { return (<SignIn />)
    } else if (this.props.view === "signup") { return (<SignUp />)
    } else { return (<IndexPage />) }
  }
}

const mapStateToProps = state => {
  return { view: state.view }
}

export default connect(mapStateToProps)(SelectorForm);
