import React, { Component } from 'react';
import classes from './IndexPage.module.css';
import MyBooks from '../MyBooks/MyBooks';
import Profile from '../Profile/Profile';
import EditChapter from '../EditChapter/EditChapter';
import LastUpdatedBooks from '../LastUpdatedBooks/LastUpdatedBooks';
import BestBooks from '../BestBooks/BestBooks';
import AllBooks from '../AllBooks/AllBooks';
import ReadBook from '../ReadBook/ReadBook';
import Preview from '../Preview/Preview';
import BookContainer from '../BookContainer/BookContainer';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import { Switch, Route, withRouter } from "react-router-dom";

class IndexPage extends Component {
  state = { id: 0, attributes: [] };

  clickHandler = (view, id, attributes = []) => {
    this.props.history.push(view);
    this.setState({ id: id, attributes: attributes });
  }

  render () {
    const { id, attributes } = this.state;

    return (
      <div className={classes.IndexPage}>
        <Switch>
          <Route exact path="/">
            <BestBooks clickHandler={this.clickHandler} />
            <hr />
            <LastUpdatedBooks clickHandler={this.clickHandler} />
            <hr />
            <AllBooks clickHandler={this.clickHandler} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/myBooks">
            <MyBooks clickHandler={this.clickHandler} />
          </Route>
          <Route path="/bookPreview">
            <Preview id={id} clickHandler={this.clickHandler} />
          </Route>
          <Route path="/editChapter">
            <BookContainer
              id={id}
              chapters={attributes}
              book_id={attributes[attributes.length-1]}>
              <EditChapter />
            </BookContainer>
          </Route>
          <Route path="/readBook">
            <BookContainer
              id={id}
              chapters={attributes.slice(0, -1)}
              book_id={attributes[attributes.length-1]}
            >
              <ReadBook />
            </BookContainer>
          </Route>
          <Route>
            <div>Not Found</div>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(IndexPage);
