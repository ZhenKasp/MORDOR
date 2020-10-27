import axios from 'axios';

const submitAction = (event, path, createFlashMessage, setToken, viewHandler) => {
  event.preventDefault();
  const data = new FormData(event.target);
  let object = {};
  data.forEach((value, key) => {object[key] = value});

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + path, object)
  .then(res => {
    if (!res.data.token) {
      createFlashMessage(res.data.error, res.data.variant);
    } else {
      setToken(res.data.token);
      localStorage.setItem("username", res.data.username);
      createFlashMessage(res.data.message, res.data.variant);
      viewHandler("index");
    }
  })
  .catch((err) => {
    createFlashMessage(err.message, "danger");
  });
}

export default submitAction;