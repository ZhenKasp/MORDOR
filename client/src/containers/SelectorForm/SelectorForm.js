import React, { useState } from 'react';
import Aux from '../../hoc/Auxiliary';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import IndexPage from '../IndexPage/IndexPage';

const SelectorForm = () => {
  const [ , setToken] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [variant, setVarian] = useState("danger");
  const [view, setView] = useState("index");

  const flashMessageHandler = (message, variant) => {
    setFlashMessage(message);
    setVarian(variant);
    setTimeout(() => {
      setFlashMessage("");
      setVarian("danger")
  }, 5000);
  }

    const isAuthenticated = () => localStorage.getItem("token");

  const tokenHandler = token => {
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
    } else {
      localStorage.removeItem('token');
      setToken(token);
    }
  };

  const chooseViewToRender = () => {
    if (view === "signin") {
      return (
        <SignIn
          createFlashMessage={flashMessageHandler}
          setView={setView}
          setToken={tokenHandler}
        />
      )
    } else if (view === "signup") {
      return (
        <SignUp
          createFlashMessage={flashMessageHandler}
          setView={setView}
          setToken={tokenHandler}
        />
      )
    } else {
      return (
        <IndexPage
          createFlashMessage={flashMessageHandler}
          setView={setView}
          setToken={tokenHandler}
          view={view}
        />
      )
    }
  }

  const View = chooseViewToRender;
  return (
    <Aux>
      <Toolbar
        createFlashMessage={flashMessageHandler}
        setView={setView}
        active={view}
        setToken={tokenHandler}
        isAuthenticated={isAuthenticated}
      />
      {flashMessage &&
      <FlashMessage variant={variant}>
        {flashMessage}
      </FlashMessage>}
      <View />
    </Aux>
  )
}

export default SelectorForm;
