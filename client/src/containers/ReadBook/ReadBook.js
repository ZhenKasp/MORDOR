import React, { useState, useEffect } from 'react';
import classes from './ReadBook.module.css';
import MarkdownIt from 'markdown-it';
import LikesField from '../../containers/LikesField/LikesField';
import axios from 'axios';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import CommentsSection from '../CommentsSection/CommentsSection';
import ChaptersNavigationMenu from '../ChaptersNavigationMenu/ChaptersNavigationMenu';
import Aux from '../../hoc/Auxiliary';
import { useTranslation } from 'react-i18next';

const ReadBook = (props) => {
  const [likes, setLikes] = useState([]);
  const { t } = useTranslation();

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
  }, [props.currentChapterIndex]);

  const mdParser = new MarkdownIt();

  return (
    <div>
      <div className="custom-html-style">
        <h2>{props.currentChapter?.name}</h2>
        {props.currentChapter.image &&
          <img
            src={props.currentChapter?.image}
            alt={props.currentChapter?.name || "image"}
            className={classes.Image}
          />
        }

        {props.currentChapter.text ?
          <Aux>
            <ChaptersNavigationMenu
              chapters={props.chapters}
              currentChapterIndex={props.currentChapterIndex}
              setCurrentChapterIndex={props.setCurrentChapterIndex}
              setCurrentChapter={props.setCurrentChapter}
            />
            <p
              className={classes.ChapterText}
              dangerouslySetInnerHTML={{__html: mdParser.render(props.currentChapter.text)}}
            />
        </Aux> : <h5>{t("No text yet")}</h5>
        }
      </div>
      <LikesField
        likes={likes}
        setLikes={setLikes}
        user={props.user}
        chapterId={props.id}
        createFlashMessage={createFlashMessage}
      />
      <ChaptersNavigationMenu
        chapters={props.chapters}
        currentChapterIndex={props.currentChapterIndex}
        setCurrentChapterIndex={props.setCurrentChapterIndex}
        setCurrentChapter={props.setCurrentChapter}
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
