import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import ChaptersNavigationMenu from '../ChaptersNavigationMenu/ChaptersNavigationMenu';
import { useDropzone } from 'react-dropzone';
import classes from './EditChapter.module.css';
import { useParams, useHistory } from 'react-router-dom';
import checkIsOwner from '../../utilities/checkIsOwner';
import { useTranslation } from 'react-i18next';

const EditChapter = (props) => {
  const [image, setImage] = useState(props.currentChapter?.image);
  let history = useHistory();
  let { book_id } = useParams();
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const checked = await checkIsOwner(book_id, props.user.id);
      console.log(checked);
      if (!checked) history.replace('/notFound');
    })();
  }, []);

  useEffect(() => {
    setImage(props.currentChapter.image);
  }, [props.currentChapter?.image]);

  const updateChapter = (event) => {
    event.preventDefault();
    const object = new FormData(event.target);
    object.append('image', image);
    object.append('name', props.currentChapter.name);
    object.append('text', props.currentChapter.text);
    object.append('id', props.id);

    try {
      axios.patch(process.env.REACT_APP_PATH_TO_SERVER + 'chapter',
        object, { headers: { authorization: props.user.token, 'Content-Type': 'multipart/form-data' }}
      ).then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          props.createFlashMessage(res.data.message, res.data.variant);
          const chapters = [...props.chapters];
          chapters[props.currentChapterIndex] = res.data.chapter;
          props.setChapters(chapters);
        }
      })
    } catch(err) {
      props.createFlashMessage(err.message, "danger");
    }
  }

  const mdParser = new MarkdownIt();

  const handleEditorChange = ({html, text}) => {
    props.setCurrentChapter({...props.currentChapter, text});
  }

  return (
    <Form onSubmit={updateChapter}>
      <Form.Group>
        <Form.Label><h3>{t("Chapter name")}</h3></Form.Label>
        <Form.Control
          maxLength="255"
          value={props.currentChapter.name}
          onChange={(e) => props.setCurrentChapter({
            ...props.currentChapter,
            name: e.target.value}
          )}
          placeholder="Chapter name"
        />
      </Form.Group>
      <Form.Group>
        <div {...getRootProps()} className={classes.Dropzone}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>{t("Drop the image")}</p> :
              <p>{t("Drag 'n' drop")}</p>
          }
          {image &&
            <img
              src={typeof image === 'string' ? image : URL.createObjectURL(image)}
              alt={image.path}
              className={classes.Image}
            />
          }
        </div>
      </Form.Group>
      <ChaptersNavigationMenu
        chapters={props.chapters}
        currentChapterIndex={props.currentChapterIndex}
        setCurrentChapterIndex={props.setCurrentChapterIndex}
        setCurrentChapter={props.setCurrentChapter}
      />
      <Form.Group>
        <MdEditor
          value={props.currentChapter.text}
          style={{ height: "500px" }}
          renderHTML={(t) => mdParser.render(t)}
          onChange={handleEditorChange}
        >
        </MdEditor>
      </Form.Group>
      <Button variant="warning" type="submit">{t("Confirm changes")}</Button>
      <hr />
      <div>
        <ChaptersNavigationMenu
          chapters={props.chapters}
          currentChapterIndex={props.currentChapterIndex}
          setCurrentChapterIndex={props.setCurrentChapterIndex}
          setCurrentChapter={props.setCurrentChapter}
        />
      </div>
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
