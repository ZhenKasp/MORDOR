import React, { PureComponent } from 'react';
import SelectorForm from './containers/SelectorForm/SelectorForm';
import Aux from './hoc/Auxiliary';
import FlashMessage from './components/FlashMessage/FlashMessage';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';

class App extends PureComponent {
  render () {
    const { text, variant } = this.props.flashMessage;

    return (
      <Aux>
        <Toolbar />
        {this.props.flashMessage?.text?.length > 0 &&
          <FlashMessage text={text} variant={variant} />
        }
        <SelectorForm />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return { flashMessage: state.flashMessage }
}

export default connect(mapStateToProps)(App);
