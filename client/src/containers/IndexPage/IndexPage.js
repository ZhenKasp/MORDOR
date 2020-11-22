import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
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
import Varification from '../../components/Varification/Varification';
import AdminPanel from '../../features/AdminPanel/AdminPanel';
import NotFound from '../../components/NotFound/NotFound';

class IndexPage extends Component {
  state = { id: 0, attributes: [], email: "" };

  clickHandler = (view, id, attributes = []) => {
    this.props.history.push(view + "/" + id);
    this.setState({ id: id, attributes: attributes });
  }

  setEmail = email => this.setState({ email: email });

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
            <SignUp setEmail={this.setEmail} />
          </Route>
          <Route path="/myBooks">
            <MyBooks clickHandler={this.clickHandler} />
          </Route>
          <Route exact path="/bookPreview/:id">
            <Preview id={id} clickHandler={this.clickHandler} />
          </Route>
          <Route exact path="/bookPreview/:book_id/editChapter/:id">
            <BookContainer
              id={id}
              chapters={attributes}>
              <EditChapter />
            </BookContainer>
          </Route>
          <Route exact path="/bookPreview/:book_id/readBook/:id">
            <BookContainer
              id={id}
              chapters={attributes}
            >
              <ReadBook />
            </BookContainer>
          </Route>
          {this.state.email &&
            <Route path="/varification">
              <Varification email={this.state.email} />
            </Route>
          }
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(IndexPage);
