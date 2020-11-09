import React from 'react';
import classes from './ReadBook.module.css';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

const ReadBook = (props) => {
  const mdParser = new MarkdownIt();

  return (
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
  )
}

export default ReadBook;
