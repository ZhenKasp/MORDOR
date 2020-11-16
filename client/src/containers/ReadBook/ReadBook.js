import React, { useState, useEffect } from 'react';
import classes from './ReadBook.module.css';
import MarkdownIt from 'markdown-it';
import LikesField from '../../containers/LikesField/LikesField';
import axios from 'axios';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import CommentsSection from '../CommentsSection/CommentsSection';

const ReadBook = (props) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "likes",
        { params: { id: props.id }}
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setLikes(res.data.likes);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, [props.currentChapter]);

  const mdParser = new MarkdownIt();

  return (
    <div>
      <div className="custom-html-style">
        <h2>{props.name}</h2>
        <hr />
          {props.text ?
            <p
              className={classes.ChapterText}
              dangerouslySetInnerHTML={{__html: mdParser.render(props.text)}}
            /> : "No text yet"
          }
      </div>
      <LikesField
        likes={likes}
        setLikes={setLikes}
        user={props.user}
        chapterId={props.id}
        createFlashMessage={createFlashMessage}
      />
      {props.user.token.length > 0 ?<CommentsSection id={props.book_id} /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadBook);
