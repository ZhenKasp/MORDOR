import React, { PureComponent } from 'react';
import SelectorForm from './containers/SelectorForm/SelectorForm';
import Aux from './hoc/Auxiliary';
import FlashMessage from './components/FlashMessage/FlashMessage';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';

class App extends PureComponent {
  state = {
    flashMessage: "",
    variant: "danger",
    view: "index"
  }

  setView = (view) => this.setState({ view: view });

  isAuthenticated = () => localStorage.getItem("token");

  tokenHandler = token => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  flashMessageHandler = (message, variant) => {
    this.setState({flashMessage: "", variant: "danger"});
    this.setState({flashMessage: message, variant: variant});
  }

  render () {
    return (
      <Aux>
        <Toolbar
          createFlashMessage={this.flashMessageHandler}
          setView={this.setView}
          active={this.state.view}
          setToken={this.tokenHandler}
          isAuthenticated={this.isAuthenticated}
        />
        {this.state.flashMessage &&
          <FlashMessage variant={this.state.variant}>
            {this.state.flashMessage}
          </FlashMessage>}
        <SelectorForm
          flashMessageHandler={this.flashMessageHandler}
          view={this.state.view}
          setView={this.setView}
          setToken={this.tokenHandler}
        />
      </Aux>
    )
  }
}

const mapStrateToProps = state => {
  return state
}

export default connect(mapStrateToProps)(App);
