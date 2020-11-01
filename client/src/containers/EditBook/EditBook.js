import React from 'react';
import Button from 'react-bootstrap/Button';

const EditBook = (props) => {
  return (
    <div>
      <h2>{props.id}</h2>
      <Button>Edit</Button>
    </div>
  )
}

export default EditBook;
