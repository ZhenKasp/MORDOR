import React, { Component } from 'react';
import classes from './IndexPage.module.css';
import MyBooks from '../MyBooks/MyBooks';
import Profile from '../Profile/Profile';
import EditChapter from '../EditChapter/EditChapter';
import LastBooks from '../LastBooks/LastBooks';
import BestBooks from '../BestBooks/BestBooks';
import Aux from '../../hoc/Auxiliary';
import FilteredBooks from '../FilteredBooks/FilteredBooks';
import ReadBook from '../../components/ReadBook/ReadBook';
import Preview from '../Preview/Preview';
import { connect } from 'react-redux';
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
          <LastBooks clickHandler={this.clickHandler} />
          <BestBooks clickHandler={this.clickHandler} />
          <hr />
          <FilteredBooks
            clickHandler={this.clickHandler}
            currentTags={this.currentTags}
          />
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
        <BookContainer id={id} chapters={attributes}>
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
  { setView: (view) => dispatch({ type: "SET_VIEW", view }) }
)

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
