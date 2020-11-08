import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import getFormData from '../../utilities/getFormData';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const CreateChapterModal = (props) => {
  const submitCreateChapter = (event) => {
    event.preventDefault();
    const object = getFormData(event);
    object["bookId"] = props.bookId

    axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'chapter',
      object, { headers: { authorization: props.user.token }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        props.setChapters([...props.chapters, res.data.chapter]);
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
          <h3>Create chapter</h3>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required type="text"
              placeholder="Name"
              name="name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Add image</Form.Label>
          </Form.Group>
          <Button type="submit">Confirm</Button>
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
