import React, { useState } from 'react';
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
import BookPreview from '../BookPreview/BookPreview';

const IndexPage = (props) => {
  const [id, setId] = useState(0);
  let view = props.view;

  const clickHandler = (view, id) => {
    setId(id);
    props.setView(view);
  }

  const viewHandler = () => {
    if (view === "index") {
      return (
        <Aux>
          <LastBooks clickHandler={clickHandler}/>
          <BestBooks clickHandler={clickHandler}/>
          <hr />
          <Tags />
          <AllBooks clickHandler={clickHandler} />
        </Aux>
      )
    } else if (view === "profile") {
      return <Profile />
    } else if (view === "myBooks") {
      return (
        <MyBooks
          setView={props.setView}
          clickHandler={clickHandler}
        />
      )
    } else if (view === "bookPreview") {
      return (
        <BookPreview id={id} />
      )
    } else if (view === "editBook") {
      return (
        <EditBook id={id} />
      )
    } else if (view === "readBook") {
      return <ReadBook id={id} />
    } else {
      return <div> Not Found </div>
    }
  }

  const View = viewHandler;

  return (
    <div className={classes.IndexPage}>
      <View />
    </div>
  )
}

export default IndexPage;
