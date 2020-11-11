import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const commentSection = props => (
  <div>
    <h2>Comments</h2>
    <Form>
      <Form.Group>
        <Form.Label>Your comment</Form.Label>
        <Form.Control
          maxLength="255"
          type="text"
          required
          name="text"
          placeholder="Comment"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Write comment
      </Button>
    </Form>
  </div>
)

export default commentSection;
