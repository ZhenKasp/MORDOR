import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './ChaptersNavigationMenu.module.css';
import { useHistory } from 'react-router-dom';

const ChaptersNavigationMenu = props => {
    let history = useHistory();

    const nextChapter = () => {
      if (props.currentChapterIndex + 1 < props.chapters.length) {
        props.setCurrentChapterIndex(props.currentChapterIndex + 1);
        props.setCurrentChapter({
          name: props.chapters[props.currentChapterIndex + 1].name || "",
          text: props.chapters[props.currentChapterIndex + 1].text || ""
        })
        history.push('./' + props.chapters[props.currentChapterIndex + 1].id);
      }
    }

    const previousChapter = () => {
      if (props.currentChapterIndex - 1 >= 0) {
        props.setCurrentChapterIndex(props.currentChapterIndex - 1);
        props.setCurrentChapter({
          name: props.chapters[props.currentChapterIndex - 1].name || "",
          text: props.chapters[props.currentChapterIndex - 1].text || ""
        })
        history.push('./' + props.chapters[props.currentChapterIndex - 1].id);
      }
    }

  return (
    <div className={classes.ChaptersNavigationMenu}>
      <Button
        variant="outline-primary"
        disabled={props.currentChapterIndex - 1 < 0}
        onClick={previousChapter}>Previous
      </Button>
      <Button
        variant="outline-primary"
        disabled={props.currentChapterIndex + 1 >= props.chapters.length}
        onClick={nextChapter}>Next
      </Button>
    </div>
  );
}

export default ChaptersNavigationMenu;
