import axios from 'axios';
import getFormData from './getFormData';

const signup = (
  event,
  path,
  createFlashMessage,
  setView,
  setEmail
) => {
  event.preventDefault();
  const object = getFormData(event);

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + "users/" + path, object)
  .then(res => {
    if (res.data.error) {
      createFlashMessage(res.data.error, res.data.variant);
    } else {
      createFlashMessage(res.data.message, res.data.variant);
      setEmail(res.data.email);
      setView("/varification");
    }
  })
  .catch((err) => {
    createFlashMessage(err.message, "danger");
  });
}

export default signup;
