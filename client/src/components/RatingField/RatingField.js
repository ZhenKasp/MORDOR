import React, { useState, useEffect } from 'react';
import Rating from 'react-rating';
import './RatingField.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { createFlashMessage } from '../../store/actions';

const RatingField = props => {
  const [averageRating, setAverageRating] = useState(props.initialRating);

  const submitRating = value => {
    axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'rating',
      { value, book_id: props.bookId },
      { headers: { authorization: props.user.token }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, res.data.variant);
      } else {
        props.createFlashMessage(res.data.message, res.data.variant);
        setAverageRating(res.data.averageRating);
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
    });
  }

  useEffect(() => {
    setAverageRating(props.initialRating);
  }, [props])

  return (
    <Rating
      stop={5}
      initialRating={averageRating}
      emptySymbol={['fa fa-star-o fa-2x low', 'fa fa-star-o fa-2x low',
        'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
        'fa fa-star-o fa-2x high']}
      fullSymbol={['fa fa-star fa-2x low', 'fa fa-star fa-2x low',
        'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
        'fa fa-star fa-2x high']}
      onClick={value => submitRating(value)}
      readonly={props.readonly || props.user.token === ""}
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(RatingField);
