import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createFlashMessage } from '../../store/actions';

const LikesField = props => {
  const [liked, setLiked] = useState(
    props.likes.some(like => like.userId === props.user.id));
  const [likeClass, setLikeClass] = useState(
    liked ? "fa fa-thumbs-up" : "far fa-thumbs-up");

  useEffect(() => {
    const alreadyLiked = props.likes.some(like => like.userId === props.user.id);
    setLiked(alreadyLiked);
    setLikeClass(alreadyLiked ? "fa fa-thumbs-up" : "far fa-thumbs-up");
  }, [props.likes]);

  const submitLike = () => {
    if (props.user.token) {
      axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'like',
        { chapter_id: props.chapterId },
        { headers: { authorization: props.user.token }}
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          props.createFlashMessage(res.data.message, res.data.variant);
          props.setLikes(res.data.likes);
        }
      })
      .catch((err) => {
        props.createFlashMessage(err.message, "danger");
      });
    }
  }

  return (
    <div>
      <i
        className={likeClass}
        onClick={submitLike}
      ></i>
    {" " + props.likes.length}
    </div>
  )
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikesField);
