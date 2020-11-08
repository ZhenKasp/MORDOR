import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const EditChapter = (props) => {
  const [currentChapter, setCurrentChapter] = useState(
    props.chapters.findIndex((chapter) => chapter.id === props.id)
  );
  const chapter = props.chapters[currentChapter];
  const [name, setName] = useState(chapter.name || "");
  const [text, setText] = useState(chapter.text || "");

  const nextChapter = () => {
    if (currentChapter + 1 < props.chapters.length) {
      setCurrentChapter(currentChapter + 1);
      setName(props.chapters[currentChapter + 1].name || "");
      setText(props.chapters[currentChapter + 1].text || "");
    }
  }

  const previousChapter = () => {
    if (currentChapter - 1 >= 0) {
      setCurrentChapter(currentChapter - 1);
      setName(props.chapters[currentChapter - 1].name || "");
      setText(props.chapters[currentChapter - 1].text || "");
    }
  }

  const updateChapter = (event) => {
    event.preventDefault();
    const object = { name, text, id: chapter.id };

    axios.patch(process.env.REACT_APP_PATH_TO_SERVER + 'chapter',
      object, { headers: { authorization: props.user.token }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
    });
  }

  const mdParser = new MarkdownIt();

  const handleEditorChange = ({html, text}) => {
    setText(text);
}

  return (
    <div>
      <Form onSubmit={updateChapter}>
        <Form.Group>
          <Form.Label><h3>Chapter name</h3></Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.targer.value)}
            placeholder="Book name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><h3>Text</h3></Form.Label>
          <MdEditor
            value={text}
            style={{ height: "500px" }}
            renderHTML={(t) => mdParser.render(t)}
            onChange={handleEditorChange}
          >
          </MdEditor>
        </Form.Group>
        <Button variant="warning" type="submit">Confirm changes</Button>
      </Form>
      <Button onClick={previousChapter}>Previous Chapter</Button>
      <Button onClick={nextChapter}>Next Chapter</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditChapter);
