import axios from 'axios';

const checkIsOwner = async (book_id, user_id) => {
  if (!user_id) return [false, null];
  let isOwner = null;
  let error = null;

  await axios.get(process.env.REACT_APP_PATH_TO_SERVER + "users/isOwner",
    { params: { book_id, user_id }}
    )
  .then(res => {
    if (res.data.error) {
      error = res.data.error;
    } else {
      isOwner = res.data.isOwner;
    }
  }).catch(err => error = err.message);

  return [isOwner, error];
}

export default checkIsOwner;
