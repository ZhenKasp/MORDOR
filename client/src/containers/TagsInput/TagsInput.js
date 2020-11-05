import React, { useState, useEffect } from 'react';
import classes from './TagsInput.module.css';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';
import { connect } from 'react-redux';

const TagsInput = (props) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "tags",
        { headers: { authorization: props.user.token }})
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setSuggestions(res.data.suggestions.map(tag => { return {id: tag, text: tag}}));
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, [])

  const handleDelete = (i) => {
    props.setTags(props.tags.filter((_, index) => index !== i));
  }

  const handleAddition = (tag) => {
    props.setTags(tags => ([...tags, tag]));
  }

  const handleDrag = (tag, currPos, newPos) => {
    const currentTags = [...props.tags];
    const newTags = currentTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    props.setTags(newTags);
  }

  return (
    <ReactTags
      classNames={{
        tag: classes.Tag,
        tagInputField: classes.TagInputField,
        tagInput: classes.TagInput,
        remove: classes.RemoveTag,
        suggestions: classes.SuggestionsTag
      }}
      suggestions={suggestions}
      tags={props.tags}
      name="tags"
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition="inline"
    />
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(TagsInput);
