import React, { useState } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './IndexPage.module.css';

const IndexPage = (props) => {
  const [view, setView] = useState(props.view);

  const viewHandler = () => {
    if (view === "index") {
      return (
        <div className={classes.IndexPage}>
          <Aux>
            MORDOR
          </Aux>
        </div>
      )
    } else if (view === "profile") {
      return (
        <div className={classes.Profile}>
          Profile
        </div>
      )
    } else if (view === "createBook") {
      return (
        <div>
          Create Book
        </div>
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
    <View />
  )
}

export default IndexPage;
