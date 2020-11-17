import React, { Component } from 'react';
import classes from './IndexPage.module.css';
import MyBooks from '../MyBooks/MyBooks';
import Profile from '../Profile/Profile';
import EditChapter from '../EditChapter/EditChapter';
import LastUpdatedBooks from '../LastUpdatedBooks/LastUpdatedBooks';
import BestBooks from '../BestBooks/BestBooks';
import Aux from '../../hoc/Auxiliary';
import AllBooks from '../AllBooks/AllBooks';
import ReadBook from '../ReadBook/ReadBook';
import Preview from '../Preview/Preview';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import BookContainer from '../BookContainer/BookContainer';


class IndexPage extends Component {
  state = { id: 0, attributes: [] };

  clickHandler = (view, id, attributes = []) => {
    this.setState({ id: id, attributes: attributes });
    this.props.setView(view);
  }

  viewHandler = () => {
    const { id, attributes } = this.state;
    const view = this.props.view;

    if (view === "index") {
      return (
        <Aux>
          <BestBooks clickHandler={this.clickHandler} />
          <hr />
          <LastUpdatedBooks clickHandler={this.clickHandler} />
          <hr />
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
        <Preview id={id} clickHandler={this.clickHandler} />
      )
    } else if (view === "editChapter") {
      return (
        <BookContainer
          id={id}
          chapters={attributes}
          book_id={attributes[attributes.length-1]}>
          <EditChapter />
        </BookContainer>
      )
    } else if (view === "readBook") {
      return (
        <BookContainer
          id={id}
          chapters={attributes.slice(0, -1)}
          book_id={attributes[attributes.length-1]}
        >
          <ReadBook />
        </BookContainer>
      )
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
  {
    setView: (view) => dispatch({ type: "SET_VIEW", view }),
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
