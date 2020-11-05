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

  flashMessageHandler = (message, variant) => {
    this.setState({flashMessage: "", variant: "danger"});
    this.setState({flashMessage: message, variant: variant});
  }

  render () {
    const { text, variant } = this.props.flashMessage;

    return (
      <Aux>
        <Toolbar
          createFlashMessage={this.flashMessageHandler}
          setView={this.setView}
          active={this.state.view}
        />
      {this.props.flashMessage?.text?.length > 0 &&
          <FlashMessage text={text} variant={variant} />
        }
        <SelectorForm
          flashMessageHandler={this.flashMessageHandler}
          view={this.state.view}
          setView={this.setView}
        />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return { flashMessage: state.flashMessage }
}

export default connect(mapStateToProps)(App);
