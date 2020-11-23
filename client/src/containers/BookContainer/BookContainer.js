import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createFlashMessage } from '../../store/actions';
import classes from "./BookContainer.module.css";
import { useParams, useHistory } from 'react-router-dom';

const BookContainer = (props) => {
  let { book_id, id } = useParams();
  const [chapters, setChapters] = useState(props.chapters);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    props.chapters.findIndex((chapter) => chapter.id === Number(id))
  );
  const chapter = props.chapters[currentChapterIndex];
  const [currentChapter, setCurrentChapter] = useState({
    name: chapter?.name || "",
    text: chapter?.text || "",
    image: chapter?.image
  });
  let history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        await axios.get(process.env.REACT_APP_PATH_TO_SERVER + "chapters",
          { params: { id: book_id }}
        ).then(res => {
          if (res.data.error) {
            props.createFlashMessage(res.data.error, res.data.variant);
          } else {
            const currentIndex = res.data.chapters.findIndex((chapter) => chapter.id === Number(id));
            setChapters(res.data.chapters);
            setCurrentChapterIndex(currentIndex);
            if (res.data.chapters.length === 0 || !res.data.chapters[currentIndex]) {
              history.replace('/notFound');
            } else {
              setCurrentChapter({
                name: res.data.chapters[currentIndex].name || "",
                text: res.data.chapters[currentIndex].text || "",
                image: res.data.chapters[currentIndex].image
              })
            }
          }
        });
      } catch (err) {
        props.createFlashMessage(err.message, "danger");
      }
    })();
  }, []);

  return (
    <div className={classes.Wrapper}>
      {React.cloneElement(
        props.children,
        {
          id,
          book_id,
          chapters,
          setChapters,
          currentChapter,
          setCurrentChapter,
          currentChapterIndex,
          setCurrentChapterIndex
        }
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(BookContainer);
