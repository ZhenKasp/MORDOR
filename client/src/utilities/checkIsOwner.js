import axios from 'axios';

const checkIsOwner = async (book_id, user_id, createFlashMessage) => {
  if (!user_id) return false;
  let isOwner = null;

  await axios.get(process.env.REACT_APP_PATH_TO_SERVER + "users/isOwner",
    { params: { book_id, user_id }}
    )
  .then(res => {
    if (res.data.error) {
      createFlashMessage(res.data.error, res.data.variant);
    } else {
      isOwner = res.data.isOwner;
    }
  }).catch(err => createFlashMessage(err.message, "danger"));

  return isOwner;
}

export default checkIsOwner;
