import React, { PureComponent } from 'react';
import SelectorForm from './containers/SelectorForm/SelectorForm';
import Aux from './hoc/Auxiliary';
import FlashMessage from './components/FlashMessage/FlashMessage';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';

class App extends PureComponent {
  state = { view: "index" };

  setView = (view) => this.setState({ view: view });

  render () {
    const { text, variant } = this.props.flashMessage;

    return (
      <Aux>
        <Toolbar
          setView={this.setView}
          active={this.state.view}
        />
      {this.props.flashMessage?.text?.length > 0 &&
          <FlashMessage text={text} variant={variant} />
        }
        <SelectorForm
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
