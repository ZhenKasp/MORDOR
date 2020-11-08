import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import Aux from '../../hoc/Auxiliary';
import OwnerBookPreview from '../OwnerBookPreview/OwnerBookPreview';
import BookPreview from '../../components/BookPreview/BookPreview';

const Preview = (props) => {
  const [book, setBook] = useState([]);
  const [isOwner, setIsOwmer] = useState(false)

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "book",
        { params: { id: props.id, userId: props.user.id },
          headers: { authorization: props.user.token }}
        )
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setIsOwmer(res.data.isOwner);
          console.log(res.data.isOwner);
          setBook(res.data.book);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, []);

  return (
    <Aux>
      { isOwner ?
        <OwnerBookPreview
          book={book}
          clickHandler={props.clickHandler}
        /> :
        <BookPreview book={book} />
      }
    </Aux>
  )
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => createFlashMessage(dispatch, {
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
