import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import  Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";
import eye from '../../../assets/images/eye.png';
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import getFormData from '../../../utilities/getFormData';
import { useTranslation } from 'react-i18next';

const Toolbar = props => {
  let history = useHistory();
  const { t, i18n } = useTranslation();

  const search = event => {
    event.preventDefault();
    const data = getFormData(event);
    history.push(`/search?against=${data.against}`);
  }

  const changeLanguageRU = () => i18n.changeLanguage('ru');
  const changeLanguageEN = () => i18n.changeLanguage('en');

  return (
    <Navbar
      className={classes.Toolbar}
      expand="md"
      bg={props.theme === "dark" ? "light" : "dark"}
      variant={props.theme === "dark" ? "light" : "dark"}
    >
      <Navbar.Brand
        className={classes.Brand}
        onClick={() => history.push("/")}
      >
        <h4>M<img src={eye} style={{width: '15px'}} alt="" />rdor</h4>
      </Navbar.Brand>

      <Form inline
        className={classes.Search}
        onSubmit={(e) => search(e)}
      >
        <FormControl
          name="against"
          type="text"
          placeholder={t('Search')}
        />
        <Button variant="outline-success" type="submit">{t('Search')}</Button>
      </Form>
      <div className={classes.LanguageButtons}>
        <Button variant="outline-info" onClick={changeLanguageRU}>{t("Change language RU")}</Button>
        <Button variant="outline-info" onClick={changeLanguageEN}>{t("Change language EN")}</Button>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <NavigationItems />
      </Navbar.Collapse>
    </Navbar>
  );
}
const mapStateToProps = state => ({ theme: state.theme})

export default connect(mapStateToProps)(Toolbar);
