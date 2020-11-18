import axios from 'axios';

const logout = (viewHandler, createFlashMessage, deleteUser, token) => {
  axios.delete(process.env.REACT_APP_PATH_TO_SERVER + "users/logout",
    { headers:
      { authorization: token }
    }, {})
  .then(res => {
    viewHandler("/");
    deleteUser();
    localStorage.clear();
    createFlashMessage(res.data.message, res.data.variant);
  })
  .catch(error => {
    console.log(error)
    createFlashMessage(error.message, "danger");
  });
}

export default logout;
