import React from 'react';
import classes from './IndexPage.module.css';
import MyBooks from '../MyBooks/MyBooks';
import Profile from '../Profile/Profile';
import CreateBook from '../CreateBook/CreateBook';
import LastBooks from '../LastBooks/LastBooks';
import BestBooks from '../BestBooks/BestBooks';
import Tags from '../Tags/Tags';
import Aux from '../../hoc/Auxiliary';

const IndexPage = (props) => {
  let view = props.view;

  const viewHandler = () => {
    if (view === "index") {
      return (
        <Aux>
          <LastBooks />
          <BestBooks />
          <Tags />
        </Aux>
      )
    } else if (view === "profile") {
      return (
        <Profile />
      )
    } else if (view === "myBooks") {
      return (
        <MyBooks
          setView={props.setView}
          createFlashMessage={props.createFlashMessage} />
      )
    } else if (view === "createBook") {
      return (
        <CreateBook />
      )
    } else {
      return (
        <div>
          Not Found
        </div>
      )
    }
  }
  const View = viewHandler
  return (
    <div className={classes.IndexPage}>
      <View />
    </div>
  )
}

export default IndexPage;
