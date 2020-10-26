import axios from 'axios';

const logout = (changeView, setToken, createFlashMessage) => {
  axios.delete(process.env.REACT_APP_PATH_TO_SERVER + "logout", { headers: { authorization: localStorage.getItem('token') }}, {})
  .then(res => {
    setToken("");
    createFlashMessage(res.data.message, res.data.variant)
  })
  .catch(error => {
    createFlashMessage(error.message, "danger");
  });
}

export default logout;