import React, { Component } from 'react';
import classes from './IndexPage.module.css';
import MyBooks from '../MyBooks/MyBooks';
import Profile from '../Profile/Profile';
import EditBook from '../EditBook/EditBook';
import LastBooks from '../LastBooks/LastBooks';
import BestBooks from '../BestBooks/BestBooks';
import Tags from '../Tags/Tags';
import Aux from '../../hoc/Auxiliary';
import AllBooks from '../AllBooks/AllBooks';
import ReadBook from '../ReadBook/ReadBook';
import Preview from '../Preview/Preview';
import { connect } from 'react-redux';

class IndexPage extends Component {
  state = { id: 0 };

  clickHandler = (view, id) => {
    this.setState({ id: id });
    this.props.setView(view);
  }

  viewHandler = () => {
    const view = this.props.view;

    if (view === "index") {
      return (
        <Aux>
          <LastBooks clickHandler={this.clickHandler}/>
          <BestBooks clickHandler={this.clickHandler}/>
          <hr />
          <Tags />
          <AllBooks clickHandler={this.clickHandler} />
        </Aux>
      )
    } else if (view === "profile") {
      return <Profile />
    } else if (view === "myBooks") {
      return (
        <MyBooks clickHandler={this.clickHandler} />
      )
    } else if (view === "bookPreview") {
      return (
        <Preview id={this.state.id} />
      )
    } else if (view === "editBook") {
      return (
        <EditBook id={this.state.id} />
      )
    } else if (view === "readBook") {
      return <ReadBook id={this.state.id} />
    } else {
      return <div> Not Found </div>
    }
  }

  render () {
    const View = this.viewHandler;

    return (
      <div className={classes.IndexPage}>
        <View />
      </div>
    )
  }
}

const mapStateToProps = state => ({ view: state.view })

const mapDispatchToProps = dispatch => (
  { setView: (view) => dispatch({ type: "SET_VIEW", view }) }
)

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
