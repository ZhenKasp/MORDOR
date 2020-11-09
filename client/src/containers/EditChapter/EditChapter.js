import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const EditChapter = (props) => {
  const updateChapter = (event) => {
    event.preventDefault();
    const { name, text, id } = props;
    const object = { name, text, id };

    axios.patch(process.env.REACT_APP_PATH_TO_SERVER + 'chapter',
      object, { headers: { authorization: props.user.token }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        const chapters = [...props.chapters];
        const index = props.chapters.findIndex((chapter) => chapter.id == res.data.chapter.id);
        chapters[index] = res.data.chapter;
        props.setChapters(chapters);
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
    });
  }

  const mdParser = new MarkdownIt();

  const handleEditorChange = ({html, text}) => {
    props.setText(text);
}

  return (
    <Form onSubmit={updateChapter}>
      <Form.Group>
        <Form.Label><h3>Chapter name</h3></Form.Label>
        <Form.Control
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          placeholder="Book name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label><h3>Text</h3></Form.Label>
        <MdEditor
          value={props.text}
          style={{ height: "500px" }}
          renderHTML={(t) => mdParser.render(t)}
          onChange={handleEditorChange}
        >
        </MdEditor>
      </Form.Group>
      <Button variant="warning" type="submit">Confirm changes</Button>
    </Form>
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
