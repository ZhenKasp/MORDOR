import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import classes from "./BookContainer.module.css";

const BookContainer = (props) => {
  const [currentChapter, setCurrentChapter] = useState(
    props.chapters.findIndex((chapter) => chapter.id === props.id)
  );
  const [chapters, setChapters] = useState(props.chapters);
  const chapter = props.chapters[currentChapter];
  const [name, setName] = useState(chapter.name || "");
  const [text, setText] = useState(chapter.text || "");

  const nextChapter = () => {
    if (currentChapter + 1 < chapters.length) {
      setCurrentChapter(currentChapter + 1);
      setName(chapters[currentChapter + 1].name || "");
      setText(chapters[currentChapter + 1].text || "");
    }
  }

  const previousChapter = () => {
    if (currentChapter - 1 >= 0) {
      setCurrentChapter(currentChapter - 1);
      setName(chapters[currentChapter - 1].name || "");
      setText(chapters[currentChapter - 1].text || "");
    }
  }

  return (
    <div className={classes.Wrapper}>
      {React.cloneElement(
        props.children,
        {
          name,
          setName,
          text,
          setText,
          chapters,
          setChapters,
          id: chapter.id,
          currentChapter
        }
      )}
      <hr />
      <div>
        <Button
          disabled={currentChapter - 1 < 0}
          onClick={previousChapter}>Previous Chapter
        </Button>
        <Button
          disabled={currentChapter + 1 >= chapters.length}
          onClick={nextChapter}>Next Chapter
        </Button>
      </div>
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
