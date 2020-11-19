import axios from 'axios';
import getFormData from './getFormData';

const signin = (
  event,
  path,
  createFlashMessage,
  setView,
  setUser
) => {
  event.preventDefault();
  const object = getFormData(event);

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + "users/" + path, object)
  .then(res => {
    if (!res.data.token) {
      createFlashMessage(res.data.error, res.data.variant);
    } else {
      setUser({
        id: res.data.id,
        token: res.data.token,
        username: res.data.username
      })
      createFlashMessage(res.data.message, res.data.variant);
      setView("/");
    }
  })
  .catch((err) => {
    createFlashMessage(err.message, "danger");
  });
}

export default signin;
