import React, { PureComponent } from 'react';
import IndexPage from './containers/IndexPage/IndexPage';
import FlashMessage from './components/FlashMessage/FlashMessage';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { withTranslation } from 'react-i18next';

class App extends PureComponent {
  render () {
    const { text, variant } = this.props.flashMessage;
    const history = createBrowserHistory();
    const { t } = this.props;

    document.getElementById('root').className = this.props.theme;
    return (
      <Router history={history} >
        <Toolbar />
        {this.props.flashMessage?.text?.length > 0 &&
          <FlashMessage text={text} variant={variant} />
        }
        <IndexPage />
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return { flashMessage: state.flashMessage, theme: state.theme }
}

export default connect(mapStateToProps)(withTranslation()(App));
