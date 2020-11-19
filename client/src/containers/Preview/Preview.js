import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';
import Aux from '../../hoc/Auxiliary';
import OwnerBookPreview from '../OwnerBookPreview/OwnerBookPreview';
import BookPreview from '../../components/BookPreview/BookPreview';
import { useParams, useHistory } from 'react-router-dom';

const Preview = (props) => {
  const [book, setBook] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let owner = false;
        await axios.get(process.env.REACT_APP_PATH_TO_SERVER + "book",
          { params: { id: id, userId: props.user.id },
            headers: { authorization: props.user.token }}
          )
        .then(res => {
          if (res.data.error) {
            props.createFlashMessage(res.data.error, res.data.variant);
          } else {
            if (!res.data.book) {
              history.replace('/notFound');
            }
            owner = res.data.isOwner;
          }
          return res.data.book
        }).then(book => {
          (async () => {
            await axios.get(process.env.REACT_APP_PATH_TO_SERVER + "rating",
              { params: { book_id: id },
                headers: { authorization: props.user.token }}
              )
            .then(res => {
              if (res.data.error) {
                props.createFlashMessage(res.data.error, res.data.variant);
              } else {
                setIsOwner(owner);
                setBook({...book, rating: res.data.averageRating });
              }
            })
          })();
        });
      } catch (err) {
        props.createFlashMessage(err.message, "danger");
      }
    })();
  }, []);

  return (
    <Aux>
      { isOwner ?
        <OwnerBookPreview
          book={book}
          clickHandler={props.clickHandler}
        /> :
        <BookPreview
          book={book}
          clickHandler={props.clickHandler}
        />
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
