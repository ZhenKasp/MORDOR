import axios from 'axios';
import getFormData from './getFormData';

const submitAction = (event, path, createFlashMessage, setToken, setView) => {
  event.preventDefault();
  const object = getFormData(event);

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + path, object)
  .then(res => {
    if (!res.data.token) {
      createFlashMessage(res.data.error, res.data.variant);
    } else {
      setToken(res.data.token);
      localStorage.setItem("username", res.data.username);
      createFlashMessage(res.data.message, res.data.variant);
      setView("index");
    }
  })
  .catch((err) => {
    createFlashMessage(err.message, "danger");
  });
}

export default submitAction;
