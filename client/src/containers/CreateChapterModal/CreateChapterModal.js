import React, { useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import { useDropzone } from 'react-dropzone';
import classes from './CreateChapterModal.module.css';
import { useTranslation } from 'react-i18next';

const CreateChapterModal = (props) => {
  const [image, setImage] = useState("");
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const { t } = useTranslation();

  const submitCreateChapter = (event) => {
    event.preventDefault();
    const object = new FormData(event.target);
    object.append('image', image);
    object.append('bookId', props.bookId);

    axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'chapter',
      object, { headers: { authorization: props.user.token, 'Content-Type': 'multipart/form-data' }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        props.setChapters([...props.chapters, res.data.chapter]);
        setImage("");
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
    });
    props.modalIsShownCancelHandler();
  }

  return (
    <div>
      <Modal
        show={props.modalIsShown}
        modalClosed={props.modalIsShownCancelHandler}
      >
        <Form
          onSubmit={submitCreateChapter}>
          <h3>{t("Create Chapter")}</h3>
          <Form.Group>
            <Form.Label>{t("Name")}</Form.Label>
            <Form.Control
              maxLength="255"
              required type="text"
              placeholder={t("Name")}
              name="name"
            />
          </Form.Group>
          <Form.Group>
            <div {...getRootProps()} className={classes.Dropzone}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>{t("Drop the image")}.</p> :
                  <p>{t("Drag 'n' drop")}</p>
              }
              {image &&
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.path}
                  className={classes.Image}
                />
              }
            </div>
          </Form.Group>
          <Button type="submit">{t("Confirm")}</Button>
        </Form>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChapterModal);
